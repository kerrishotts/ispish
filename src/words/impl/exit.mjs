import { Token, KINDS } from '../../Token.mjs';

export default ({
    evaluate, token, scope, globalScope,
} = {}) => {
    scope.__exitSignal__ = true;
};
