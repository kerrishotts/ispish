const { KINDS, Token } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const times = Token.guard(evaluate(Token.guard(token.leftChild), scope), {
        expected: KINDS.NUMBER,
    }).value;
    const body = Token.guard(token.rightChild, { expected: KINDS.LIST });
    scope.__exitSignal__ = false;
    let result;
    for (let i = 0; i < times; i += 1) {
        const r = evaluate(body, scope);
        if (r) {
            result = r;
        }
        if (scope.__exitSignal__) {
            break;
        }
    }
    scope.__exitSignal__ = false;
    return result;
};
