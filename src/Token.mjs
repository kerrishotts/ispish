/**
 * KINDS enumerates the various types of tokens that ispish understands
 */
export const KINDS = {
    NUMBER: 'NUMBER',
    TUPLE: 'TUPLE',
    LIST: 'LIST',
    BLOCK: 'BLOCK',
    VARIABLE: 'VARIABLE',
    STRING: 'STRING',
    WORD: 'WORD',
    OP: 'OP',
    UNKNOWN: 'UNKNOWN',
    EXPR: 'EXPR',
};

const _value = Symbol('_value');
const _tokens = Symbol('_tokens');
const _kind = Symbol('_kind');
const _line = Symbol('_line');
const _pos = Symbol('_pos');

/**
 * The Token class is the base representaiton for all things tokenized,
 * parsed, and types during evaluation. It can represent a tokenized
 * version of a string, an abstract syntax tree, and handles type
 * handling during code execution.
 */
export class Token {
    /**
     *
     * @param {*} [param0 = {}]
     * @property {string} [param0.kind = KINDS.UNKNOWN]
     * @property {number | string | array} [param0.value]
     * @property {Tokens[]} [param0.tokens = []]
     * @property {number?} [param0.line]  line of token
     * @property {number?} [param0.pos]  char position of token on line
     */
    constructor({
        kind = KINDS.UNKNOWN,
        value = undefined,
        tokens = [],
        line = undefined,
        pos = undefined,
    } = {}) {
        this[_value] = value;
        this[_tokens] = tokens;
        this[_line] = line;
        this[_pos] = pos;
        this.kind = kind;
    }

    get where() {
        if (this[_line] === undefined || this[_pos] === undefined) {
            return '';
        }
        return `(at ${this[_line]}:${this[_pos]})`;
    }

    get line() {
        return this[_line];
    }

    get pos() {
        return this[_pos];
    }

    /**
     * Return the kind of token. {@link KINDS}
     *
     * @type {string}
     * @memberof Token
     */
    get kind() {
        return this[_kind];
    }

    set kind(v) {
        this[_kind] = v;
        if (this.isWord || this.isVariable) {
            this[_value] = this[_value].toUpperCase();
        }
        if (this.isNumber) {
            this[_value] = Number(this[_value]);
        }
    }

    /**
     * Return the token's data. When used to represent an AST,
     * this is equivalent to the node and left/right represent
     * the tree branches.
     *
     * @type {Token | Token[] | String | Number}
     */
    get value() {
        return this[_value];
    }

    set value(v) {
        this[_value] = v;
        if (this.isWord || this.isVariable) {
            this[_value] = this[_value].toUpperCase();
        }
        if (this.isNumber) {
            this[_value] = Number(this[_value]);
        }
    }

    /**
     * Tokens attached to this token.
     * @type {Token[]}
     */

    get tokens() {
        return this[_tokens];
    }

    set tokens(v) {
        this[_tokens] = v;
    }

    // utility methods for treating tokens like trees

    /**
     * This node's left child. If not present, returns `undefined`.
     *
     * @type {Token}
     * @readonly
     */
    get leftChild() {
        return this.tokens[0];
    }

    /**
     * This node's right child. If not present, returns 'undefined'.
     *
     * @type {Token}
     * @readonly
     */
    get rightChild() {
        return this.tokens[1];
    }

    /**
     * This node's right children. If not present, returns an empty array
     *
     * @type {Token[]}
     * @readonly
     */
    get rightChildren() {
        const [_, ...rest] = this.tokens; // eslint-disable-line no-unused-vars
        return rest;
    }

    /**
     * Unwraps this token. Generally this has no effect unless the token itself
     * represents an expression, in which case a new Token is returned that
     * represents the expression structure in a more natural manner.
     *
     * @type {Token}
     * @readonly
     */
    get unwrappedToken() {
        // if this token is an expression, we want the unwrapped token
        if (!this.isExpr) {
            return this;
        }
        /**
         * @type {Token}
         */
        const token = this.value;
        return new Token({
            kind: token.kind,
            value: token.value,
            tokens: this.tokens,
        });
    }

    /**
     * Return this token's value as an unboxed primitive, if
     * possible
     *
     * @type { Number | String | Array}
     * @readonly
     */
    get unboxed() {
        if (this.isNumber || this.isString || this.isWord) {
            return this.value;
        }
        if (this.isList) {
            return this.value /* :Token[] */
                .map(v => v.unboxed);
        }
        return undefined;
    }

    /**
     * Return this token's word, if it is one
     * @type { String }
     * @readonly
     */
    get word() {
        if (this.isWord) {
            return this.value;
        }
        return undefined;
    }

    /**
     * Return this token's variable, if it is one
     * @type { String }
     * @readonly
     */
    get variable() {
        if (this.isVariable) {
            return this.value;
        }
        return undefined;
    }

    // type checking

    /**
     * Returns `true` if the token represents a number
     *
     * @type {Boolean}
     * @readonly
     */
    get isNumber() {
        return this.kind === KINDS.NUMBER;
    }

    /**
     * Returns `true` if the token represents a tuple
     *
     * @type {Boolean}
     * @readonly
     */
    get isTuple() {
        return this.kind === KINDS.TUPLE;
    }

    /**
     * Returns `true` if the token represents a list
     *
     * @type {Boolean}
     * @readonly
     */
    get isList() {
        return this.kind === KINDS.LIST;
    }

    /**
     * Returns `true` if the token represents a block
     *
     * @type {Boolean}
     * @readonly
     */
    get isBlock() {
        return this.kind === KINDS.BLOCK;
    }

    /**
     * Returns `true` if the token represents a string
     *
     * @type {Boolean}
     * @readonly
     */
    get isString() {
        return this.kind === KINDS.STRING;
    }

    /**
     * Returns `true` if the token represents a word
     *
     * @type {Boolean}
     * @readonly
     */
    get isWord() {
        return this.kind === KINDS.WORD;
    }

    /**
     * Returns `true` if the token represents a variable reference
     *
     * @type {Boolean}
     * @readonly
     */
    get isVariable() {
        return this.kind === KINDS.VARIABLE;
    }

    /**
     * Returns `true` if the token type is unknown
     *
     * @type {Boolean}
     * @readonly
     */
    get isUnknown() {
        return this.kind === KINDS.UNKNOWN;
    }

    /**
     * Returns `true` if the token represents a expression
     *
     * @type {Boolean}
     * @readonly
     */
    get isExpr() {
        return this.kind === KINDS.EXPR;
    }

    /**
     * Returns `true` if the token represents a operator
     *
     * @type {Boolean}
     * @readonly
     */
    get isOp() {
        return this.kind === KINDS.OP;
    }

    // quality of life methods

    /**
     * Make console logging nicer!
     *
     * @type {String}
     * @readonly
     */
    get [Symbol.toStringTag]() {
        return `TOKEN:${KINDS[this.kind]}<${this.where}> ${this.value} ${this.tokens}`;
    }

    /**
     * Make descriptions nicer!
     *
     * @type {String}
     * @readonly
     */
    get description() {
        let { value, tokens } = this;
        if (Array.isArray(value)) {
            if (value.length > 0) {
                value = `[ ${value.map(v => (v instanceof Token ? v.description : v)).join(' ')} ]`;
            } else {
                value = '[]';
            }
        }
        if (Array.isArray(tokens)) {
            if (tokens.length > 0) {
                tokens = `[ ${tokens
                    .map(v => (v instanceof Token ? v.description : v))
                    .join(' ')} ]`;
            } else {
                tokens = '[]';
            }
        }
        if (value instanceof Token) {
            value = value.description;
        }
        return `${KINDS[this.kind]}<${this.where}>:${value}:${tokens}`;
    }

    /**
     * Guards aganist types and expectations.
     *
     * @static
     * @param {Token?} token  The token to check
     * @param {any} [param0={}]
     * @property {string | string[]} [param0.expected}] The type(s) to expect
     * @property {boolean} [param0.exists = true] if true, throw if now token is provided
     * @property {string} [msg] if supplied, use this message instead of default
     * @memberof Token
     * @returns {Token}
     */
    static guard(token, { expected = undefined, exists = true, msg = undefined } = {}) {
        if (!token && exists) {
            throw new Error(`Expected a ${expected || 'token'}; didn't receive one.`);
        }
        if (token.value === undefined && exists) {
            throw new Error(
                `Expected a ${expected || 'token'}; didn't receive one. ${token.where}`
            );
        }
        if (typeof expected === 'string') {
            if (!(token.kind === expected)) {
                throw new Error(msg || `Expected a ${expected}; got ${token.kind}. ${token.where}`);
            }
        }
        if (Array.isArray(expected)) {
            if (!expected.some(kind => kind === token.kind)) {
                throw new Error(
                    msg || `Expected ${expected.join(', ')}; got ${token.kind}. ${token.where}`
                );
            }
        }
        return token;
    }

    static box(primitive) {
        if (typeof primitive === 'string') {
            return new Token({
                kind: KINDS.STRING,
                value: primitive,
            });
        }
        if (typeof primitive === 'number') {
            return new Token({
                kind: KINDS.NUMBER,
                value: primitive,
            });
        }
        if (Array.isArray(primitive)) {
            return new Token({
                kind: KINDS.LIST,
                value: primitive.map(i => Token.box(i)),
            });
        }
    }

    /**
     * returns a value indicating the equality of the two tokens
     * if less then, -1
     * if greater than, 1
     * if equal, 0
     * if not equal, undefined
     *
     * @param {Token} a
     * @param {Token} b
     * @return {number?}
     */
    static compare(a, b) {
        if (a.kind === b.kind) {
            const av = a.value;
            const bv = b.value;
            switch (a.kind) {
                case KINDS.NUMBER:
                case KINDS.STRING:
                case KINDS.WORD:
                    return av < bv ? -1 : av > bv ? 1 : 0;
                case KINDS.LIST: {
                    if (av.length === bv.length) {
                        if (av.every((i, idx) => Token.compare(i, bv[idx]) === 0)) {
                            return 0;
                        }
                    }
                    return undefined;
                }
                default:
                    return undefined;
            }
        } else {
            return undefined;
        }
    }

    static add(a, b) {
        if (a.kind !== b.kind) {
            throw new Error(`Operator type mismatch; got ${a.kind} and ${b.kind} ${a.where}`);
        }

        if (a.kind !== KINDS.LIST) {
            return new Token({
                kind: a.kind,
                value: a.value + b.value,
                line: a.line,
                pos: a.pos,
            });
        }
        return new Token({
            kind: a.kind,
            value: [...a.value, ...b.value],
            line: a.line,
            pos: a.pos,
        });
    }

    static sub(a, b) {
        if (a.kind !== b.kind) {
            throw new Error(`Operator type mismatch; got ${a.kind} and ${b.kind}`);
        }
        if (a.kind !== KINDS.LIST) {
            return new Token({
                kind: a.kind,
                value: a.value - b.value,
                line: a.line,
                pos: a.pos,
            });
        }
        return new Token({
            kind: a.kind,
            value: a.value.filter(av => b.value.every(bv => Token.compare(av, bv) !== 0)),
            line: a.line,
            pos: a.pos,
        });
    }

    static mul(a, b) {
        Token.guard(a, { expected: KINDS.NUMBER });
        Token.guard(b, { expected: KINDS.NUMBER });

        return new Token({
            kind: a.kind,
            value: a.value * b.value,
            line: a.line,
            pos: a.pos,
        });
    }

    static div(a, b) {
        Token.guard(a, { expected: KINDS.NUMBER });
        Token.guard(b, { expected: KINDS.NUMBER });

        return new Token({
            kind: a.kind,
            value: a.value / b.value,
            line: a.line,
            pos: a.pos,
        });
    }
}
