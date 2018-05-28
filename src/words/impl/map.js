const { KINDS, Token } = require('../../Token.js');
const createScope = require('../../createScope.js');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const list = Token.guard(evaluate(Token.guard(token.leftChild), scope), {
        expected: KINDS.LIST,
    }).value;
    if (!Array.isArray(list)) {
        throw new Error('MAP: Expected to operate over a list!');
    }

    // the second token MAY be a single WORD representing a single
    // variable, OR it MAY be a LIST of WORDs representing two variables

    const argTokens = Token.guard(token.tokens[1], { expected: [KINDS.LIST, KINDS.WORD] });
    const args = [];
    if (argTokens.isList) {
        // make sure that all the args are WORDS
        if (!Array.isArray(argTokens.value)) {
            throw new Error('MAP: Expected RHS to be a list of words');
        }
        argTokens.value.forEach(t => args.push(Token.guard(t, { expected: KINDS.WORD }).word));
    } else if (argTokens.isWord) {
        args.push(argTokens.word);
    }
    const fn = Token.guard(token.tokens[2], { expected: KINDS.BLOCK });
    return new Token({
        kind: KINDS.LIST,
        value: list.map((item, idx) => {
            const newScope = createScope(scope, globalScope);
            const toPass = [
                item,
                new Token({
                    kind: KINDS.NUMBER,
                    value: idx,
                }),
            ];
            args.forEach((arg, idx) => {
                newScope[arg] = toPass[idx];
            });
            return evaluate(fn, newScope); // [0];
        }),
    });
};
