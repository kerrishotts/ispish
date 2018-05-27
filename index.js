const wordRegistry = require('./src/WordRegistry.js');
const { KINDS, Token } = require('./src/Token.js');
const tokenize = require('./src/tokenize.js');
const parse = require('./src/parse.js');
const evaluate = require('./src/evaluate.js');
const standardWords = require('./src/standardWords.js');

standardWords(wordRegistry);

function run(code) {
    let tokens;
    let ast;

    try {
        tokens = tokenize(code);
    } catch (err) {
        throw new Error(`Failure to tokenize: ${err.message}
${err.stack}`);
    }

    try {
        ast = parse(tokens);
    } catch (err) {
        throw new Error(`Failure to parse: ${err.message}
${err.stack}`);
    }

    try {
        const r = evaluate(new Token({
            kind: KINDS.BLOCK,
            value: ast,
        }));
        return r;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    wordRegistry,
    Token,
    KINDS,
    tokenize,
    parse,
    evaluate,
    run,
};
