const { KINDS, Token } = require('../../Token.js');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const expr = evaluate(token.tokens[0], scope);
    return new Token({
        kind: KINDS.NUMBER,
        value: expr.reduce((acc, token) => {
            acc += evaluate(token, scope).value;
            return acc;
        }, 0),
    });
};
