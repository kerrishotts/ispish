const base = 'http://localhost:50733/External/AC349DFF-BE04-4EB7-B51A-F862EB13178D/';

function require(modulePath) {
    const r = new XMLHttpRequest();
    const module = {};
    
    r.onLoadEnd = () => {
        if (r.status === 0 || (r.status >= 200 && r.status <= 299)) {
            module.exports = eval(`
                ${r.responseText};
                return module.exports;
            `);
        } else {
            if (!modulePath.endsWith('.js')) {
                try {
                    return require(`${modulePath}.js`);
                } catch(err) {
                    throw err;
                }
            } else {
                throw new Error(`Could not locate or load module ${modulePath}`);
            }
        }
    };
    
    r.open("GET", modulePath.replace(/^\.\//, base));
    r.send(true); // sync
    
    return module.exports;
}

console.log(window.location.href);

const ispish = require('./index.js');