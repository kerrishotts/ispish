import { Token, KINDS } from '../Token.mjs';

export default {
    AND: {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) =>
            Token.guard(a, { expected: KINDS.NUMBER }).value === 1 &&
            Token.guard(b, { expected: KINDS.NUMBER }).value === 1
                ? 1
                : 0,
    },
    OR: {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) =>
            Token.guard(a, { expected: KINDS.NUMBER }).value === 1 ||
            Token.guard(b, { expected: KINDS.NUMBER }).value === 1
                ? 1
                : 0,
    },
    '+': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 12,
        impl: (a, b) => Token.add(a, b),
    },
    '-': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 12,
        impl: (a, b) => Token.sub(a, b),
    },
    '/': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) => Token.div(a, b),
    },
    '*': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 13,
        impl: (a, b) => Token.mul(a, b),
    },
    '<': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) < 0 ? 1 : 0),
    },
    '>': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) > 0 ? 1 : 0),
    },
    '<=': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) <= 0 ? 1 : 0),
    },
    '>=': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) >= 0 ? 1 : 0),
    },
    '==': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) === 0 ? 1 : 0),
    },
    '!=': {
        native: true,
        op: true,
        lhs: 1,
        rhs: 1,
        precedence: 11,
        impl: (a, b) => (Token.compare(a, b) !== 0 ? 1 : 0),
    },
};
