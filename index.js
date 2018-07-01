import wordRegistry from './src/WordRegistry.js';
import { KINDS, Token } from './src/Token.js';
import tokenize from './src/tokenize.js';
import parse from './src/parse.js';
import evaluate from './src/evaluate.js';
import standardWords from './src/standardWords.js';

standardWords(wordRegistry);

export function run(code, scope = {}) {
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
        const r = evaluate(
            new Token({
                kind: KINDS.BLOCK,
                value: ast,
                line: 1,
                pos: 1,
            }),
            scope,
        );
        return r;
    } catch (err) {
        throw err;
    }
}

export function reset() {
        wordRegistry.reset();
        standardWords(wordRegistry);
}
