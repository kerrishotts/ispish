/* global describe, it */
import { run, reset } from '../index.mjs';

import fs from 'fs';
import path from 'path';
import chai from 'chai';
const { expect } = chai;

import fixtures from './fixtures/index.js';

describe('run', () => {
    describe('#simple', () => {
        const tests = [
            {
                name: 'error-1',
                code: 'printify "Hello, world"',
                error: 'Cannot find PRINTIFY (at 1:1)',
            },
            {
                name: 'error-1',
                code: 'LET :NAME "John"',
                error: 'Expected WORD, LIST; got VARIABLE. (at 1:5)',
            },
            {
                name: 'print-1',
                code: 'print "Hello, World"',
                result: 'Hello, World',
            },
            {
                name: 'print-2',
                code: 'print [ "Hello" ", " "World" ]',
                result: 'Hello, World',
            },
            {
                name: 'print-3',
                code: 'print 42',
                result: '42',
            },
            {
                name: 'scope-1',
                code: `
let name "John"
{
    let name "Martha"
    print name
}
print name
                `,
                result: 'John',
            },
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
                name: 'precedence-1',
                code: '2 + 4 * 5',
                result: 22,
            },
            {
                name: 'precedence-2',
                code: '(2 + 4) * 5',
                result: 30,
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
                code: 'let a [10 20 30] a . 1',
                result: 20,
            },
            {
                name: 'sum-1',
                code: 'sum [ 10 20 30 40 ]',
                result: 100,
            },
            {
                name: 'let-1',
                code: 'let a 5',
                result: 5,
            },
            {
                name: 'let-2',
                code: 'let a 5 let b a a + b',
                result: 10,
            },
            {
                name: 'let-3',
                code: 'let [a b c] [1 2 3] a + b + c',
                result: 6,
            },
        ];
        tests.forEach(({ name, code, result, error } = {}) => {
            it(name, () => {
                reset();
                if (error) {
                    expect(() => run(code)).throws(error);
                } else {
                    const r = run(code);
                    expect(r.value).to.deep.equal(result);
                }
            });
        });
    });
    describe('#fixtures', () => {
        fixtures
            .map(fixture => ({
                fixture,
                code: fs.readFileSync(path.join('.', 'test', 'fixtures', fixture), {
                    encoding: 'utf8',
                }),
            }))
            .forEach(({ fixture, code } = {}) => {
                it(fixture, () => {
                    reset();
                    const r = run(code);
                    if (r.isList) {
                        expect(r.value.map(i => i.value)).to.deep.equal(
                            Array.from(
                                { length: r.value.length },
                                (_, idx) => (!r.value[idx].isNumber ? r.value[idx].value : 1)
                            )
                        );
                    }
                    if (Array.isArray(r)) {
                        r.forEach(i => expect(i).to.be.equal(1));
                    }
                });
            });
    });
});
