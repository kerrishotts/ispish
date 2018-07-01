
import letImpl from './impl/let.js';
import exitImpl from './impl/exit.js';
import exitWithImpl from './impl/exitWith.js';
import toImpl from './impl/to.js';
import toNativeImpl from './impl/to.native.js';
import whenImpl from './impl/when.js';
import ifImpl from './impl/if.js';
import elseImpl from './impl/else.js';
import repeatImpl from './impl/repeat.js';
import mapImpl from './impl/map.js';
import sumImpl from './impl/sum.js';
import dotImpl from './impl/dot.js';
import sizeImpl from './impl/size.js';
import printImpl from './impl/print.js';
import printCodeImpl from './impl/printCode.js';
import remImpl from './impl/rem.js';

export default {
    LET: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 0,
        impl: letImpl
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
    "TO.NATIVE": {
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
        impl: whenImpl
    },
    IF: {
        native: true,
        lhs: 0,
        rhs: 2,
        precedence: 1,
        impl: ifImpl
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
        impl: sumImpl
    }, // SUM [list]
    '.': {
        native: true,
        lhs: 1,
        rhs: 1,
        precedence: 20,
        impl: dotImpl
    },
    SIZE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: sizeImpl
    },
    PRINT: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: printImpl
    },
    PRINTCODE: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: printCodeImpl
    },
    REM: {
        native: true,
        lhs: 0,
        rhs: 1,
        precedence: 0,
        impl: remImpl
    },
};
