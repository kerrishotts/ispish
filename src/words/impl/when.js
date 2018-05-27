const { Token, KINDS } = require('../../Token');
const createScope = require('../../createScope');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const list = Token.guard(token.leftChild, { expected: KINDS.LIST }).value;
    if (!Array.isArray(list)) {
        throw new Error('Expected a list of conditional expressions and blocks');
    }

    let r;
    for (let idx = 0; idx < list.length; idx += 2) {
        const cExpr = list[idx];
        const doExpr = list[idx + 1];
        if (doExpr) {
            if (
                Token.guard(evaluate(Token.guard(cExpr), scope), { expected: KINDS.NUMBER })
                    .unboxed === 1
            ) {
                r = evaluate(Token.guard(doExpr), createScope(scope));
                break;
            }
        } else if (r === undefined) {
            r = evaluate(Token.guard(cExpr), createScope(scope));
        }
    }

    return r;
};
