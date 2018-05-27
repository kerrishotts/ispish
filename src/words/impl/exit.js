const { Token, KINDS } = require('../../Token');

module.exports = ({
    evaluate, token, scope, globalScope,
} = {}) => {
    scope.__exitSignal__ = true;
};
