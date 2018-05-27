function createScope(parent, global = {}) {
    const scope = {};
    scope.__parent__ = parent;
    scope.__global__ = global;
    return scope;
}

module.exports = createScope;
