import { KINDS, Token } from '../../Token.mjs';

export default ({ evaluate, token, scope, globalScope } = {}) => {
    const lhs = Token.guard(evaluate(Token.guard(token.leftChild), scope), { expected: [KINDS.LIST, KINDS.STRING] });
    /*if (!Array.isArray(lhs)) {
        throw new Error('.: Expected a list for LHS');
    }*/
    const rhs = Token.guard(evaluate(Token.guard(token.rightChild), scope), {
        expected: [KINDS.NUMBER, KINDS.LIST],
    });
    const lhsValue = lhs.value;
    const rhsValue = rhs.unboxed;
    if (rhs.isList) {
        const [start, end] = rhsValue.map(i => (i >= 0 ? i : lhsValue.length + i));
        if (lhs.isList) {
            return new Token({
                kind: KINDS.LIST,
                value: lhsValue.filter((_, idx) => idx >= start && idx <= end),
            });
        }
        // lhs is a string
        return new Token({
            kind: KINDS.STRING,
            value: lhsValue.substring(start, end + 1)
        });
    }
    if (typeof rhsValue !== 'number') {
        throw new Error('.: Expected RHS to be a number');
    }
    const r = rhsValue >= 0 ? lhsValue[rhsValue] : lhsValue[lhsValue.length + rhsValue];
    if (!(r instanceof Token)) {
        return Token.box(r);
    }
    return r;
};
