/* global describe, it */
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { run } = require('../index.js');

const fixtures = require('./fixtures');

describe('run', () => {
    describe('#simple', () => {
        const tests = [
            {
                name: 'addition-1',
                code: '10 + 10',
                result: 20,
            },
            {
                name: 'addition-2',
                code: '10 + 10 + 5',
                result: 25,
            },
            {
                name: 'subtraction-1',
                code: '20 - 10',
                result: 10,
            },
            {
                name: 'if-1',
                code: '1 if (5 < 10) "true"',
                result: 'true',
            },
            {
                name: 'if-2',
                code: '1 if (5 > 10) "true"',
                result: 1,
            },
            {
                name: 'if-else-1',
                code: 'if (5 > 10) "true" else "false"',
                result: 'false',
            },
            {
                name: 'if-else-2',
                code: 'if (5 < 10) "true" else "false"',
                result: 'true',
            },
            {
                name: 'dot-1',
                code: '[10 20 30] . 1',
                result: 20,
            },
            {
                name: 'dot-reverse-1',
                code: '[10 20 30] . -1',
                result: 30,
            },
            {
                name: 'dot-2',
                code: 'let a [10 20 30] :a . 1',
                result: 20,
            },

        ];
        tests
            .forEach(({ name, code, result } = {}) => {
                it(name, () => {
                    const r = run(code);
                    expect(r.value).to.deep.equal(result);
                });
            });
    });
    describe('#fixtures', () => {
        fixtures
            .map(fixture => ({
                fixture,
                code: fs.readFileSync(path.join(__dirname, 'fixtures', fixture), {
                    encoding: 'utf8',
                }),
            }))
            .forEach(({ fixture, code } = {}) => {
                it(fixture, () => {
                    const r = run(code);
                    if (r.isList) {
                        expect(r.value.map(i => i.value)).to.deep.equal(Array.from(
                            { length: r.value.length },
                            (_, idx) => (!r.value[idx].isNumber ? r.value[idx].value : 1),
                        ));
                    }
                    if (Array.isArray(r)) {
                        r.forEach(i => expect(i).to.be.equal(1));
                    }
                });
            });
    });
});
