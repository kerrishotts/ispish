const { Token, KINDS } = require('./Token.js');

function tokenize(code, { line = 1, pos = 1 } = {}) {
    const whitespace = /\s/;
    const alpha = /[A-Za-z_]/;
    const digit = /[0-9\.]/;
    const operator = /[+\-\/\*<>=]/;
    const openingBrace = /[\[\{\(]/;
    const closingBrace = /[\]\}\)]/;
    const quotes = /['"]/;

    const initialState = {
        str: '',
        tokens: [],
        line,
        pos,
        startLine: line,
        startPos: pos,
    };
    const wrappedCode = `${code} `;
    const { tokens, str } = Array.from(wrappedCode).reduce((state, ch) => {
        const { tokens } = state;
        let { str, line, pos, startLine, startPos } = state;
        let skipCh = false;
        let newToken = false;

        if (ch === String.fromCharCode(10)) {
            line += 1;
            pos = 1;
        } else if (ch !== String.fromCharCode(13)) {
            pos += 1;
        }

        if (str.length > 0) {
            // string is not empty, but see if we're at a token break

            // string is an identifier -- we allow A-Za-z0-9
            if (alpha.test(str[0])) {
                if (alpha.test(ch) || digit.test(ch)) {
                    str += ch;
                } else {
                    newToken = true;
                }
            } else if (str[0] === ':') {
                if (alpha.test(ch) || digit.test(ch)) {
                    str += ch;
                } else {
                    newToken = true;
                }
            } else if (digit.test(str[0])) {
                if (digit.test(ch)) {
                    str += ch;
                } else {
                    newToken = true;
                }
            } else if (str[0] === '+' || str[0] === '-') {
                if (digit.test(ch)) {
                    str += ch;
                } else {
                    newToken = true;
                }
            } else if (quotes.test(str[0])) {
                if (ch !== str[0]) {
                    str += ch;
                } else {
                    newToken = true;
                    skipCh = true;
                }
            } else if (openingBrace.test(str[0])) {
                const matchingBrace = str[0] === '[' ? ']' : str[0] === '(' ? ')' : '}';
                if (ch !== str[0] && ch !== matchingBrace) {
                    str += ch;
                    skipCh = true;
                } else if (ch !== matchingBrace) {
                    // account for nesting
                    str += ch;
                } else if (
                    Array.from(str)
                        .filter(c => c === str[0] || c === matchingBrace)
                        .reduce((acc, c) => acc + (c === str[0] ? 1 : -1), 0) > 1
                ) {
                    str += ch;
                } else {
                    newToken = true;
                    skipCh = true;
                }
                // }
            } else if (operator.test(str[0])) {
                if (operator.test(ch)) {
                    str += ch;
                } else {
                    newToken = true;
                }
            } else if (!whitespace.test(ch)) {
                str += ch;
            } else {
                newToken = true;
            }

            if (!newToken) {
                return {
                    str,
                    tokens,
                    line,
                    pos,
                    startLine,
                    startPos,
                };
            }

            // decide what to do with this token
            const curToken = new Token({ line: startLine, pos: startPos });
            if (str[0] === ':') {
                curToken.value = str.substr(1);
                curToken.kind = KINDS.VARIABLE;
            } else if (quotes.test(str[0])) {
                curToken.value = str.substr(1);
                curToken.kind = KINDS.STRING;
            } else if (!Number.isNaN(Number(str))) {
                curToken.value = Number(str);
                curToken.kind = KINDS.NUMBER;
            } else if (str[0] === '[') {
                curToken.value = tokenize(str.substr(1), { line: startLine, pos: startPos });
                curToken.kind = KINDS.LIST;
            } else if (str[0] === '{') {
                curToken.value = tokenize(str.substr(1), { line: startLine, pos: startPos });
                curToken.kind = KINDS.BLOCK;
            } else if (str[0] === '(') {
                curToken.value = tokenize(str.substr(1), { line: startLine, pos: startPos });
                curToken.kind = KINDS.TUPLE;
            } else if (operator.test(str[0])) {
                curToken.value = str;
                curToken.kind = KINDS.OP;
            } else {
                curToken.value = str;
                curToken.kind = KINDS.WORD;
            }

            tokens.push(curToken);

            startLine = line;
            startPos = pos;

            // get ready for next token
            if (skipCh) {
                str = '';
            } else {
                str = !whitespace.test(ch) ? ch : '';
            }

            return {
                str,
                tokens,
                line,
                pos,
                startLine,
                startPos,
            };
        }
        str = !whitespace.test(ch) ? ch : '';

        return {
            str,
            tokens,
            line,
            pos,
            startLine,
            startPos,
        };
    }, initialState);
    if (str !== '') {
        throw new Error('Unexpected end of input');
    }
    return tokens;
}

module.exports = tokenize;
