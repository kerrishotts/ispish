import wordRegistry from './src/WordRegistry.mjs';
import { KINDS, Token } from './src/Token.mjs';
import tokenize from './src/tokenize.mjs';
import parse from './src/parse.mjs';
import evaluate from './src/evaluate.mjs';
import standardWords from './src/standardWords.mjs';

export { default as wordRegistry } from './src/WordRegistry.mjs';
export { KINDS, Token } from './src/Token.mjs';
export { default as tokenize } from './src/tokenize.mjs';
export { default as parse } from './src/parse.mjs';
export { default as evaluate } from './src/evaluate.mjs';
export { default as standardWords } from './src/standardWords.mjs';


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
