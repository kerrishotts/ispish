#!/usr/bin/env node --experimental-modules
import { reset, run, evaluate, Token, KINDS } from './index.mjs';
import createScope from './src/createScope.mjs';

import fs from 'fs';
import getStdin from 'get-stdin';
import repl from 'repl';

const scope = {};

const [, , ...args] = process.argv;

const options = {
    print: false,
    interactive: false,
    private: false,
};

args.forEach(arg => {
    if (arg.startsWith('--')) {
        options[arg.substr(2)] = true;
    }
});

const files = args.filter(arg => !arg.startsWith('--'));

function exec(code) {
    const newScope = options.private ? {} : createScope(scope, scope);
    const r = run(code, newScope);
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
    //let scope = {};
    const isRecoverableError = e => /(Unexpected end of input|didn't receive one)/.test(e.message);
    const exec = (cmd, context, filename, callback) => {
        try {
            let r = run(cmd, scope);

            if (r !== undefined) {
                const printExpr = new Token({
                    kind: KINDS.EXPR,
                    value: new Token({
                        kind: KINDS.WORD,
                        value: 'PRINTCODE',
                    }),
                    tokens: [r],
                });

                r = evaluate(printExpr);
            } else {
                r = '(no return)';
            }

            let ret;
            if (r && r.unboxed !== undefined) {
                ret = r.unboxed;
            }
            callback(null);
        } catch (err) {
            if (isRecoverableError(err)) {
                return callback(new repl.Recoverable(err));
            }
            console.error('Error:', err.message);
            callback(null);
        }
    };
    const r = repl.start({
        prompt: '\nReady.\n',
        eval: exec,
    });
    r.on('reset', () => {
        console.log('Resetting dictionary...');
        scope = {};
        reset();
    });
}
