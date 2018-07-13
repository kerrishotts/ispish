/* eslint-disable no-prototype-builtins */

import { KINDS, Token } from './Token.mjs';
import createScope from './createScope.mjs';

import wordRegistry from './WordRegistry.mjs';

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
    throw new Error(`Cannot find ${variable}`);
}

/**
 *
 * @param {Token} ast
 * @param {*} scope
 * @returns {*}
 */
function evaluate(ast, scope = {}) {
    // const { words: arities } = require('./WordRegistry.js');
    const arities = wordRegistry.words;
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
            scope
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
        token.value.forEach(token => {
            const result = evaluate(token, scope);
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

    const tokenIsOp = token.isOp && (arities[token.value] && arities[token.value].op);
    const tokenIsWord = token.isWord || (arities[token.value] && !arities[token.value].op);

    //if (token.isOp) {
    if (tokenIsOp) {
        const arity = arities[token.value];
        if (arity) {
            const { impl } = arities[token.value];
            const lhs = Token.guard(evaluate(Token.guard(token.leftChild), scope));
            const rhs = Token.guard(evaluate(Token.guard(token.rightChild), scope));
            const r = impl(lhs, rhs, scope);
            if (r instanceof Token) {
                return r;
            }
            return new Token({
                kind: KINDS.NUMBER,
                value: r,
            });
        }
        throw new Error(`Unexpected operator ${token.value}`);
    }
    if (tokenIsWord) {
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
            const args = new Token({
                kind: KINDS.LIST,
                value: [],
            });
            const rest = new Token({
                kind: KINDS.LIST,
                value: [],
            });
            if (func.args) {
                func.args.forEach((varName, idx) => {
                    const argToken = Token.guard(token.tokens[idx]);
                    const arg = argToken.isBlock ? argToken : evaluate(argToken, scope);
                    newScope[varName] = arg;
                    args.value.push(arg);
                });
            }
            if (token.tokens.length > args.value.length) {
                for (let idx = args.value.length; idx < token.tokens.length; idx += 1) {
                    const argToken = Token.guard(token.tokens[idx]);
                    const arg = argToken.isBlock ? argToken : evaluate(argToken, scope);
                    args.value.push(arg);
                    rest.value.push(arg);
                }
            }
            newScope._ARGS = args;
            newScope._REST = rest;
            newScope['...'] = rest;
            if (!func.native) {
                return evaluate(func, newScope);
            }

            let compiledFn = func.__compiled__;
            if (!compiledFn) {
                // this is a JS function, which means we handle this
                // differently!
                let jsCode = evaluate(func, newScope).unboxed;
                jsCode = Object.entries(newScope).reduce((acc, [k, v]) => {
                    const repl = `{{${k}}}`;
                    while (acc.indexOf(repl) > -1) {
                        acc = acc.replace(
                            repl,
                            `this.scope.${k}${v instanceof Token ? '.unboxed' : ''}`
                        );
                    }
                    return acc;
                }, jsCode);

                compiledFn = new Function(jsCode); // eslint-disable-line no-new-func

                func.__compiled__ = compiledFn;
            }
            const r = compiledFn.apply({
                scope: newScope,
                Token,
                KINDS,
                args,
                rest,
            });
            if (r instanceof Token) {
                return r;
            }
            return Token.box(r);
        } catch (err) {
            throw new Error(`${err.message} ${token.where}`);
        }
    }
    return undefined;
}

export default evaluate;