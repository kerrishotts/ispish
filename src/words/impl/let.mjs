import { Token, KINDS } from '../../Token.mjs';

export default ({
    evaluate, token, scope, globalScope,
} = {}) => {

    const varExpr = Token.guard(token.leftChild, { expected: [KINDS.WORD, KINDS.LIST] });
    const expr = Token.guard(token.rightChild);
    const r = expr.isBlock ? expr : evaluate(expr, scope);
    if (varExpr.isList) {
        if (r.isList) {
            const items = r.value;
            varExpr.value.forEach((varName, idx) => {
                scope[varName.word] = items[idx];
            });
            // TODO: support ...REST?
        } else {
            throw new Error(`LET can't destructure non-lists`);
        }
    } else {
        const varName = varExpr.word;
        scope[varName] = r;
    }
    return r;
};
