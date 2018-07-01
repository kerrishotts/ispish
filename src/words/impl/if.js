import { KINDS, Token } from '../../Token.js';

export default ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const cExpr = Token.guard(evaluate(Token.guard(token.leftChild), scope), {
        expected: KINDS.NUMBER,
    });
    if (typeof cExpr.value !== 'number') {
        throw new Error('IF: Expected a number when evaluating conditional expression');
    }
    const thenExpr = Token.guard(token.rightChild);
    if (cExpr.value !== 0) {
        return evaluate(thenExpr, scope);
    }
};
