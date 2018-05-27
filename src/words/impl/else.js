const { KINDS, Token } = require('../../Token.js');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {

    const ifExpr = Token.guard(token.leftChild, { expected: KINDS.EXPR });
    const elseExpr = Token.guard(token.rightChild);

    let r = evaluate(ifExpr, scope);
    if (r === undefined) {
        r = evaluate(elseExpr, scope);
    }
    return r;
};
