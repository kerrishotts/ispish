const { Token, KINDS } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {

    const varName = Token.guard(token.leftChild, { expected: KINDS.WORD }).word;
    const expr = evaluate(Token.guard(token.rightChild), scope);
    scope[varName] = expr;
};
