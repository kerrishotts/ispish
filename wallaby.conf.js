module.exports = function wallaby() {
    return {
        files: ['src/**/*.js', 'index.js', 'test/fixtures/**/*'],

        tests: ['test/*.js'],

        env: {
            type: 'node',
        },
    };
};
