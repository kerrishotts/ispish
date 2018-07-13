import letImpl from './impl/let.mjs';
import exitImpl from './impl/exit.mjs';
import exitWithImpl from './impl/exitWith.mjs';
import toImpl from './impl/to.mjs';
import toNativeImpl from './impl/to.native.mjs';
import whenImpl from './impl/when.mjs';
import ifImpl from './impl/if.mjs';
import elseImpl from './impl/else.mjs';
import repeatImpl from './impl/repeat.mjs';
import mapImpl from './impl/map.mjs';
import sumImpl from './impl/sum.mjs';
import dotImpl from './impl/dot.mjs';
import sizeImpl from './impl/size.mjs';
import printImpl from './impl/print.mjs';
import printCodeImpl from './impl/printCode.mjs';
import remImpl from './impl/rem.mjs';
import requireImpl from './impl/require.mjs';

export default {
    LET: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: -1,
        impl: letImpl,
    }, // LET var expr
    '=': {
        op: false,
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: -1,
        impl: letImpl,
    }, // LET var expr
    EXIT: {
        native: true,
        lhs: 0,
        rhs: 0,
        precedence: 0,
        impl: exitImpl,
    },
    EXITWITH: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: exitWithImpl,
    },
    TO: {
        native: true,
        lhs: 0,
        rhs: 3,
        precedence: 0,
        impl: toImpl,
    }, // TO proc [ parms ] {block}
    'TO.NATIVE': {
        native: true,
        lhs: 0,
        rhs: 3,
        precedence: 0,
        impl: toNativeImpl,
    }, // TO proc [ parms ] {block}
    WHEN: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: whenImpl,
    },
    IF: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 1,
        impl: ifImpl,
    }, // IF condition THEN {block}
    ELSE: {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 0,
        impl: elseImpl,
    }, // (if) ELSE {block}
    REPEAT: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 0,
        impl: repeatImpl,
    }, // RPT # {block} ?
    MAP: {
        // MAP list args stmt-list
        native: true,
        lhs: 0,
        rhs: 3,
        precedence: 0,
        impl: mapImpl,
    },
    SUM: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: sumImpl,
    }, // SUM [list]
    '.': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 20,
        impl: dotImpl,
    },
    SIZE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: sizeImpl,
    },
    PRINT: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: printImpl,
    },
    PRINTCODE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: printCodeImpl,
    },
    REM: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: remImpl,
    },
    REQUIRE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: requireImpl,
    },
};
