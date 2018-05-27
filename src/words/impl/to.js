const { KINDS, Token } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    /*
     * we expect the following token structure
     *
     * WORD:TO (<-- token)
     *   leftChild: EXPR
     *     value: WORD (proc name)
     *     leftChild: LIST of WORDS (arguments)
     *   rightChild: BLOCK (body)
     */
    //console.log(token.leftChild);
    const meta = Token.guard(token.leftChild, { expected: [KINDS.EXPR, KINDS.WORD] });

    if (!meta.isWord && !(meta.value instanceof Token)) {
        throw new Error('TO: Expected a single WORD for proc definition');
    }
    const varName = Token.guard(meta.isWord ? meta : meta.value, { expected: KINDS.WORD }).word;
    const argTokens = meta.isWord ? {value: []} : Token.guard(meta.leftChild, { expected: KINDS.LIST });

    // check each argToken to ensure that it's just a basic word
    if (!Array.isArray(argTokens.value)) {
        throw new Error('TO: Expected list of words as arguments');
    }
    if (!meta.isWord) {
        argTokens.value.forEach(t => Token.guard(t, { expected: KINDS.WORD }));
    }

    const args = meta.isWord ? [] : argTokens.unboxed;
    // const args = token.tokens[0].tokens[0].value.map(arg => arg.value);
    let body;
    if (args.length < 2) {
        body = token.tokens[1];
    } else {
        body = token.tokens[0].tokens[1];
    }
    if (globalScope[varName]) {
        throw new Error("Can't redefine an existing funciton");
    }
    globalScope[varName] = body;
    globalScope[varName].args = args;
};
