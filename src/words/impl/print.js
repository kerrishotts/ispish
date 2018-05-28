const { Token, KINDS } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const expr = evaluate(Token.guard(token.leftChild), scope);
    const r = expr.isList ? expr.unboxed.join('') : expr.unboxed;
    console.log(r);
    return new Token({
        kind: KINDS.STRING,
        value: r.toString(),
    });
};
