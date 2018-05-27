module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    const times = evaluate(token.tokens[0], scope).value;
    const body = token.tokens[1];
    for (let i = 0; i < times; i += 1) {
        evaluate(body, scope);
    }
};
