const { KINDS, Token } = require('./Token.js');
const wordRegistry = require('./WordRegistry.js');

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
            precedence: -100,
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
            // parseTokens[posOfHighestToken] = parsedTokens[parsedTokens.length - 1];
            parseTokens[posOfHighestToken] = new Token({
                kind: KINDS.EXPR,
                value: new Token({
                    kind: KINDS.TUPLE,
                    value: parsedTokens,
                    line: token.line,
                    pos: token.pos,
                }),
                line: token.line,
                pos: token.pos,
            });
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
            const lhsTokens = parseTokens.slice(posOfHighestToken - arity.lhs, posOfHighestToken);
            const rhsTokens = parseTokens.slice(
                posOfHighestToken + 1,
                posOfHighestToken + arity.rhs + 1,
            );

            // special case -- we need to figure out the arity for functions
            // TO procs ARENT SCOPED!!!!
            if (token.isWord && token.value === 'TO') {
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

            const exprToken = new Token({
                kind: KINDS.EXPR,
                value: token,
                line: token.line,
                pos: token.pos,
            });
            exprToken.tokens = parse([...lhsTokens, ...rhsTokens]);

            parseTokens = [
                ...parseTokens.slice(0, posOfHighestToken - arity.lhs),
                exprToken,
                ...parseTokens.slice(posOfHighestToken + arity.rhs + 1, parseTokens.length),
            ];
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

module.exports = parse;
