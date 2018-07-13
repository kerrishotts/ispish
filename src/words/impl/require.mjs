import { Token, KINDS } from '../../Token.mjs';
import { run } from '../../../index.mjs';
import createScope from '../../createScope.mjs';

const modules = { };

export default ({ evaluate, token, scope, globalScope } = {}) => {
    const module = Token.guard(token.leftChild, { expected: [KINDS.WORD, KINDS.STRING] }).value.toUpperCase();
    if (modules[module]) {
        return;
    }
    const code = scope.__global__.__require__(module);
    modules[module] = code;
    run(code, createScope(scope, globalScope));
};
