export default {
    '+': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 12,
        impl: (a, b) => a + b,
    },
    '-': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 12,
        impl: (a, b) => a - b,
    },
    '/': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) => a / b,
    },
    '*': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) => a * b,
    },
    '<': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (a < b ? 1 : 0),
    },
    '>': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (a > b ? 1 : 0),
    },
    '<=': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (a <= b ? 1 : 0),
    },
    '>=': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (a >= b ? 1 : 0),
    },
    '==': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => {
            if (
                (typeof a === 'number' && typeof b === 'number') ||
                (typeof a === 'string' && typeof b === 'string')
            ) {
                return a === b ? 1 : 0;
            }
            if (Array.isArray(a) && Array.isArray(b)) {
                return a.length === b.length && a.every((_, idx) => a[idx].value === b[idx].value)
                    ? 1
                    : 0;
            }
            return 0;
        },
    },
    '!=': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (a !== b ? 1 : 0),
    },
};
