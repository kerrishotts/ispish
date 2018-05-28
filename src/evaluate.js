const { KINDS, Token } = require('./Token.js');
const createScope = require('./createScope');
const { words: arities } = require('./WordRegistry.js');

function lookup(variable, scope) {
    let curScope = scope;
    while (curScope && !curScope.hasOwnProperty(variable)) {
        curScope = curScope.__parent__;
    }
    if (curScope && curScope.hasOwnProperty(variable)) {
        return curScope[variable];
    }
    if (scope.__global__ && scope.__global__.hasOwnProperty(variable)) {
        return scope.__global__[variable];
    }
    throw new Error(`Can't find ${variable}`);
}

/**
 *
 * @param {Token} ast
 * @param {*} scope
 * @returns {*}
 */
function evaluate(ast, scope = {}) {
    if (ast === undefined) {
        return undefined;
    }

    /* if (Array.isArray(ast)) {
        const r = ast.map(expr => evaluate(expr, scope)).filter(v => v !== undefined);
        if (r.length > 0) {
            return new Token({
                kind: KINDS.LIST,
                value: r,
            });
        }
        return r[0];
    } */

    const globalScope = scope.__global__ || scope;

    const token = ast;

    if (token.isExpr) {
        return evaluate(
            new Token({
                kind: token.value.kind,
                value: token.value.value,
                tokens: token.tokens,
            }),
            scope,
        );
    }

    if (token.isString) {
        return token;
    }
    if (token.isNumber) {
        return token;
    }
    if (token.isVariable) {
        return evaluate(lookup(token.value, scope), scope);
    }
    if (token.isTuple) {
        let r;
        const newScope = createScope(scope, globalScope);
        token.value.forEach((token) => {
            const result = evaluate(token, newScope);
            if (result !== undefined) {
                r = result;
            }
        });
        return r;
    }
    if (token.isList) {
        return new Token({
            kind: KINDS.LIST,
            value: token.value.map(expr => evaluate(expr, scope)),
        });
    }
    if (token.isBlock) {
        let r;
        const newScope = createScope(scope, globalScope);
        const block = Token.guard(token, { expected: KINDS.BLOCK }).value;
        if (!Array.isArray(block)) {
            throw new Error('EVAL: Expected BLOCK to be a list of tokens');
        }
        /* token.value.forEach((token) => {
            const result = evaluate(token, newScope);
            if (result !== undefined) {
                r = result;
            }
        }); */
        for (let idx = 0; idx < block.length; idx += 1) {
            const result = evaluate(block[idx], newScope);
            if (result !== undefined) {
                r = result;
            }
            if (newScope.__exitSignal__) {
                break;
            }
        }
        if (newScope.__exitSignal__) {
            scope.__exitSignal__ = true;
        }
        return r;
    }
    if (token.isOp) {
        const lhs = evaluate(token.tokens[0], scope);
        const rhs = evaluate(token.tokens[1], scope);
        return new Token({
            kind: KINDS.NUMBER,
            value: arities[token.value].impl(lhs.value, rhs.value),
        });
    }
    if (token.isWord) {
        // is there a native impl? use it first
        if (arities[token.value] !== undefined && arities[token.value].impl) {
            return arities[token.value].impl({
                evaluate,
                scope,
                globalScope,
                token,
            });
        }
        // call
        try {
            const func = lookup(token.value, scope);
            const newScope = createScope(scope, globalScope);
            if (func.args) {
                func.args.forEach((varName, idx) => {
                    const argToken = Token.guard(token.tokens[idx]);
                    const arg = argToken.isBlock ? argToken : evaluate(argToken, scope);
                    newScope[varName] = arg;
                });
            }
            return evaluate(func, newScope);
        } catch (err) {
            throw new Error(`${err.message} ${token.where}`);
        }
    }
    return undefined;
}

module.exports = evaluate;
