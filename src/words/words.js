module.exports = {
    LET: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 0,
        impl: require('./impl/let.js'),
    }, // LET var expr
    EXIT: {
        native: true,
        lhs: 0,
        rhs: 0,
        precedence: 0,
        impl: require('./impl/exit.js'),
    },
    EXITWITH: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/exitWith.js'),
    },
    TO: {
        native: true,
        lhs: 0,
        rhs: 3,
        precedence: 0,
        impl: require('./impl/to.js'),
    }, // TO proc [ parms ] {block}
    WHEN: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/when.js'),
    },
    IF: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 1,
        impl: require('./impl/if.js'),
    }, // IF condition THEN {block}
    ELSE: {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/else.js'),
    }, // (if) ELSE {block}
    REPEAT: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 0,
        impl: require('./impl/repeat.js'),
    }, // RPT # {block} ?
    MAP: {
        // MAP list args stmt-list
        native: true,
        lhs: 0,
        rhs: 3,
        precedence: 0,
        impl: require('./impl/map.js'),
    },
    SUM: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/sum.js'),
    }, // SUM [list]
    '.': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 20,
        impl: require('./impl/dot.js'),
    },
    SIZE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/size.js'),
    },
    PRINT: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/print.js'),
    },
    REM: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: require('./impl/rem.js'),
    },
};
