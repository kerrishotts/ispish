const { Token, KINDS } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const list = Token.guard(evaluate(Token.guard(token.leftChild), scope), {
        expected: KINDS.LIST,
    }).unboxed;
    if (!Array.isArray(list)) {
        throw new Error('SIZE: Expected to be called on a list.');
    }
    return new Token({
        kind: KINDS.NUMBER,
        value: list.length,
    });
};
