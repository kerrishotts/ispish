const { Token, KINDS } = require('../../Token');

const tokenToString = (token) => {
    if (token.isNumber) {
        return token.value.toString();
    }
    if (token.isString) {
        return `"${token.value}"`;
    }
    if (token.isWord) {
        return token.value;
    }
    if (token.isOp) {
        return `${tokenToString(token.leftChild)} ${token.value} ${tokenToString(token.rightChild)}`;
    }
    if (token.isExpr) {
        return tokenToString(new Token({
            kind: token.value.kind,
            value: token.value.value,
            tokens: token.tokens,
        }));
    }
    if (token.isTuple) {
        return `( ${token.value.map(token => tokenToString(token)).join(' ')} )`;
    }
    if (token.isBlock) {
        return `{ ${token.value.map(token => tokenToString(token)).join(' ')} }`;
    }
    if (token.isList) {
        return `[ ${token.value.map(token => tokenToString(token)).join(' ')} ]`;
    }
    return '';
};

const print = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    //const expr = evaluate(Token.guard(token.leftChild), scope);
    const expr = Token.guard(token.leftChild);
    if (expr) {
        const r = tokenToString(expr);
        console.log('→', r);
        return new Token({
            kind: KINDS.STRING,
            value: r.toString(),
        });
    }
};

module.exports = print;
