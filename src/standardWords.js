const words = require('./words');

function standardWords(wordRegistry) {
    Object.entries(words).forEach(([word, meta]) => {
        wordRegistry.add(word, meta);
    });

    // aliases
    wordRegistry.add('RPT', words.REPEAT);
}

module.exports = standardWords;
