class WordRegistry {
    constructor() {
        this.words = {};
    }

    reset() {
        this.words = {};
    }

    add(word, {
        lhs = 0, rhs = 0, precedence = 0, impl = undefined, native = false, op = false,
    } = {}) {
        if (this.words[word] && this.words[word].native) {
            throw new Error('Cannot overwrite native word implementation.');
        }
        this.words[word] = {
            native,
            op,
            lhs,
            rhs,
            precedence,
            impl,
        };
    }
}

const wordRegistry = new WordRegistry();

export default wordRegistry;
