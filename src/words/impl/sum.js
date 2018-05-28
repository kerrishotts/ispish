const { KINDS, Token } = require('../../Token.js');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const expr = Token.guard(evaluate(token.leftChild, scope), { expected: KINDS.LIST }).value;
    if (!Array.isArray(expr)) {
        throw new Error('SUM only works on lists');
    }
    return new Token({
        kind: KINDS.NUMBER,
        value: expr.reduce((acc, token) => {
            acc += evaluate(token, scope).value;
            return acc;
        }, 0),
    });
};
