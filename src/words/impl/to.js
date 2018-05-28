const { KINDS, Token } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const meta = Token.guard(token.leftChild, { expected: [KINDS.EXPR, KINDS.WORD] });

    if (!meta.isWord && !(meta.value instanceof Token)) {
        throw new Error('TO: Expected a single WORD for proc definition');
    }
    const varName = Token.guard(meta.isWord ? meta : meta.value, { expected: KINDS.WORD }).word;
    const argTokens = meta.isWord
        ? { value: [] }
        : Token.guard(meta.leftChild, { expected: KINDS.LIST });

    // check each argToken to ensure that it's just a basic word
    if (!Array.isArray(argTokens.value)) {
        throw new Error('TO: Expected list of words as arguments');
    }
    if (!meta.isWord) {
        argTokens.value.forEach(t => Token.guard(t, { expected: KINDS.WORD }));
    }

    const args = meta.isWord ? [] : argTokens.unboxed;

    let body;
    switch (args.length) {
    case 0:
        [, , body] = token.tokens;
        break;
    case 1:
        body = token.rightChild;
        break;
    default:
        [, body] = token.leftChild.tokens;
    }

    if (globalScope[varName]) {
        throw new Error(`Can't redefine word ${varName}. ${token.where}`);
    }

    globalScope[varName] = body;
    globalScope[varName].args = args;
};
