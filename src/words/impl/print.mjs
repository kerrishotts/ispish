import { Token, KINDS } from '../../Token.mjs';

const tokenToString = token => {
    if (token.isNumber) {
        return token.value.toString();
    }
    if (token.isString) {
        return token.value;
    }
    if (token.isList) {
        return `${token.value.map(token => tokenToString(token)).join('')}`;
    }
    return '';
};

export default ({ evaluate, token, scope, globalScope } = {}) => {
    const expr = evaluate(Token.guard(token.leftChild), scope);
    const r = tokenToString(expr);
    console.log(r);
    return new Token({
        kind: KINDS.STRING,
        value: r.toString(),
    });
};
