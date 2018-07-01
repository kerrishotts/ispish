import { Token, KINDS } from '../../Token.js';
import createScope from '../../createScope.js';

export default ({
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
                r = evaluate(Token.guard(doExpr), createScope(scope, globalScope));
                break;
            }
        } else if (r === undefined) {
            r = evaluate(Token.guard(cExpr), createScope(scope, globalScope));
        }
    }

    return r;
};
