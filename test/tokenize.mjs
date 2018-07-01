/* global describe, it */
// const fs = require('fs');
// const path = require('path');
import { Token, KINDS } from '../src/Token.mjs';
import tokenize from '../src/tokenize.mjs';

import chai from 'chai';
const { expect } = chai;
/*
const fixtures = require('./fixtures');

fixtures.map(fixture => {
    return {fixture, code: fs.readFileSync(path.join(__dirname, 'fixtures', fixture))};
}).forEach(({fixture, code} = {}) => {
    describe(fixture, () => {

    });
})
*/


describe('Tokenize', () => {
    describe('#simple', () => {
        it('should be able to tokenize an empty string', () => {
            const tokens = tokenize('');
            expect(tokens).to.be.deep.equal([]);
        });
        it('should be able to parse a number', () => {
            const tokens = tokenize('25');
            expect(tokens).to.deep.equal([
                new Token({
                    kind: KINDS.NUMBER,
                    value: 25,
                    line: 1,
                    pos: 1,
                }),
            ]);
        });
        it('should be able to parse a string', () => {
            const tokens = tokenize('"Hello, world"');
            expect(tokens).to.deep.equal([
                new Token({
                    kind: KINDS.STRING,
                    value: 'Hello, world',
                    line: 1,
                    pos: 1,
                }),
            ]);
        });
    });
});
