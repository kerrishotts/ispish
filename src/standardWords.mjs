import words from './words/index.mjs';

export default function standardWords(wordRegistry) {
    Object.entries(words).forEach(([word, meta]) => {
        wordRegistry.add(word, meta);
    });

    // aliases
    wordRegistry.add('RPT', words.REPEAT);
}
