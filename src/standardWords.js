import words from './words/index.js';

export default function standardWords(wordRegistry) {
    Object.entries(words).forEach(([word, meta]) => {
        wordRegistry.add(word, meta);
    });

    // aliases
    wordRegistry.add('RPT', words.REPEAT);
}
