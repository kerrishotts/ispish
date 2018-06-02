#!/usr/bin/env node
const fs = require('fs');
const getStdin = require('get-stdin');
const repl = require('repl');

const [, , ...args] = process.argv;

const options = {
    print: false,
    interactive: false,
};

args.forEach((arg) => {
    if (arg.startsWith('--')) {
        options[arg.substr(2)] = true;
    }
});

const files = args.filter(arg => !arg.startsWith('--'));

function exec(code) {
    const { run } = require('./index.js');
    const r = run(code);
    if (options.print) {
        console.log(r.unboxed);
    }
}

files.forEach((file) => {
    const code = fs.readFileSync(file, { encoding: 'utf8' });
    exec(code);
});

getStdin().then((str) => {
    if (str.trim() !== '') {
        exec(str);
    }
});

if (options.interactive) {
    const { reset, run } = require('./index.js');
    let scope = {};
    const isRecoverableError = e => /(Unexpected end of input|didn't receive one)/.test(e.message);
    const exec = (cmd, context, filename, callback) => {
        try {
            const r = run(cmd, scope);
            let ret;
            if (r && r.unboxed !== undefined) {
                ret = r.unboxed;
            }
            callback(null, ret);
        } catch (err) {
            if (isRecoverableError(err)) {
                return callback(new repl.Recoverable(err));
            }
            console.error('Error:', err.message);
            callback(null);
        }
    };
    const r = repl.start({
        prompt: '> ',
        eval: exec,
    });
    r.on('reset', () => {
        console.log('Resetting dictionary...');
        scope = {};
        reset();
    });
}
