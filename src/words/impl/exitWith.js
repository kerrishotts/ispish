const { Token, KINDS } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    scope.__exitSignal__ = true;
    const expr = evaluate(Token.guard(token.leftChild), scope);
    return expr;
};
