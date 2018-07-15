import { KINDS, Token } from './Token.mjs';
import wordRegistry from './WordRegistry.mjs';
import __require__ from './require.mjs';
import tokenize from './tokenize.mjs';

function getArityFor(token) {
    const { words: arities } = wordRegistry;
    const defaultArity = {
        lhs: 0,
        rhs: 0,
        precedence: -1,
    };

    if (token.isWord || token.isOp) {
        if (arities[token.value]) {
            return arities[token.value];
        }
    }
    if (token.isExpr) {
        return {
            lhs: 0,
            rhs: 0,
            precedence: 1000,
        };
    }
    return defaultArity;
}

/**
 *
 * @param {Token[]} tokens
 */
function parse(tokens) {
    let parseTokens = Array.from(tokens);
    // loop until _everything_ becomes an expression
    while (parseTokens.filter(token => !token.isExpr).length > 0) {
        // find the token (and position) with the highest precedence
        const posOfHighestToken = parseTokens.reduce((highTokenPos, token, idx, arr) => {
            if (token.isExpr) {
                return highTokenPos;
            }
            if (highTokenPos < 0) {
                return idx;
            }
            const highTokenArity = getArityFor(arr[highTokenPos]);
            const tokenArity = getArityFor(token);
            if (tokenArity.precedence > highTokenArity.precedence) {
                return idx;
            }
            return highTokenPos;
        }, -1);

        const token = parseTokens[posOfHighestToken];
        if (token.isTuple) {
            const parsedTokens = parse(token.value);
            const newToken = new Token({
                kind: KINDS.EXPR,
                value: parsedTokens[0],
                line: token.line,
                pos: token.pos,
            });
            newToken.value.tokens.push(...parsedTokens.slice(1));
            parseTokens[posOfHighestToken] = newToken;
        } else if (token.isBlock) {
            const parsedTokens = parse(token.value);
            parseTokens[posOfHighestToken] = new Token({
                kind: KINDS.EXPR,
                value: new Token({
                    kind: KINDS.BLOCK,
                    value: parsedTokens,
                    line: token.line,
                    pos: token.pos,
                }),
                line: token.line,
                pos: token.pos,
            });
        } else if (token.isList) {
            const parsedTokens = parse(token.value);
            parseTokens[posOfHighestToken] = new Token({
                kind: KINDS.EXPR,
                value: new Token({
                    kind: KINDS.LIST,
                    value: parsedTokens,
                    line: token.line,
                    pos: token.pos,
                }),
                line: token.line,
                pos: token.pos,
            });
        } else {
            const arity = getArityFor(token);
            const isOp = arity.op;
            const lhsTokens = parseTokens.slice(posOfHighestToken - arity.lhs, posOfHighestToken);
            const rhsTokens = parseTokens.slice(
                posOfHighestToken + 1,
                posOfHighestToken + arity.rhs + 1,
            );

            // special case -- we need to figure out the arity for functions
            // TO procs ARENT SCOPED!!!!
            if (token.isWord && (token.value === 'TO' || token.value === 'TO.NATIVE')) {
                // name is in rhsTokens[0] and list of args is in rhsTokens[1]
                const funcName = rhsTokens[0].value;
                const argTokens = rhsTokens[1].value;
                const numArgs = argTokens.length;
                wordRegistry.add(funcName, {
                    lhs: 0,
                    rhs: numArgs,
                    precedence: 0,
                });
            }

            if (token.isWord && token.value === 'REQUIRE') {
                const moduleName = rhsTokens[0].value;
                const code = __require__(moduleName);
                const tokens = parse(tokenize(code));
                parseTokens = [
                    ...parseTokens.slice(0, posOfHighestToken - arity.lhs),
                    new Token({
                        kind: KINDS.BLOCK,
                        value: tokens,
                        line: token.line,
                        pos: token.pos,
                    }),
                    ...parseTokens.slice(posOfHighestToken + arity.rhs + 1, parseTokens.length),
                ];
            } else {
                let exprToken;

                if (token.isWord && isOp) {
                    exprToken = new Token({
                        kind: KINDS.EXPR,
                        value: new Token({
                            kind: KINDS.OP,
                            value: token.value,
                            line: token.line,
                            pos: token.pos,
                            tokens: token.tokens,
                        }),
                        line: token.line,
                        pos: token.pos,
                    });
                } else {
                    // op looks like a word but isn't
                    exprToken = new Token({
                        kind: KINDS.EXPR,
                        value: token,
                        line: token.line,
                        pos: token.pos,
                    });
                }
                exprToken.tokens = parse([...lhsTokens, ...rhsTokens]);

                parseTokens = [
                    ...parseTokens.slice(0, posOfHighestToken - arity.lhs),
                    exprToken,
                    ...parseTokens.slice(posOfHighestToken + arity.rhs + 1, parseTokens.length),
                ];
            }
        }
    }
    // unwrap unnecessary expressions (they complicate the ast unnecessarily)
    return parseTokens.map((token) => {
        if (token.isExpr) {
            if (token.tokens.length === 0) {
                return token.value;
            }
        }
        return token;
    });
}

export default parse;
