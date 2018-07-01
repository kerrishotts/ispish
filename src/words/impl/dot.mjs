
import { KINDS, Token } from '../../Token.mjs';

export default ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const lhs = Token.guard(evaluate(Token.guard(token.leftChild), scope), { expected: KINDS.LIST })
        .value;
    if (!Array.isArray(lhs)) {
        throw new Error('.: Expected a list for LHS');
    }
    const rhs = Token.guard(evaluate(Token.guard(token.rightChild), scope), {
        expected: KINDS.NUMBER,
    }).unboxed;
    if (typeof rhs !== 'number') {
        throw new Error('.: Expected RHS to be a number');
    }
    const r = rhs >= 0 ? lhs[rhs] : lhs[lhs.length + rhs];
    return r;
};
