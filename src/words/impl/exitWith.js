import { Token, KINDS } from '../../Token.js';

export default ({
    evaluate, token, scope, globalScope,
} = {}) => {
    scope.__exitSignal__ = true;
    const expr = evaluate(Token.guard(token.leftChild), scope);
    return expr;
};
