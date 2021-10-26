let capitalize = require('../capitalize');

let chai = require('chai');
let expect = chai.expect;

describe('capitalize', () => {
    it('capitalizes a single word', () => {
        expect(capitalize('express')).to.equal('Express');
        expect(capitalize('cATS')).to.equal('Cats');
    });

    it('makes the rest of the string lowercase', () => {
        expect(capitalize('javaScript')).to.equal('Javascript');
    });

    it('leaves empty string alone', () => {
        expect(capitalize('')).to.equal('');
    });

    it('leaves strings with no words alone', () => {
        expect(capitalize(' ')).to.equal(' ');
        expect(capitalize('123')).to.equal('123');
    });

    it('capitalizes multi-word strings', () => {
        expect(capitalize('what is Express?')).to.equal('What is express?');
    });

    it('leaves already capitalized words alone', () => {
        expect(capitalize('Express')).to.equal('Express');
    });

    it('capitalizes String objects without changin their values', () => {
        let str = new String('who is JavaScript?');
        expect(capitalize(str)).to.equal('Who is javascript?');
        expect(str.valueOf()).to.equal('who is JavaScript?');
    });

    it('throws an error if passed a number', () => {
        expect(() => { capitalize(123) }).to.throw(Error);
    });

    it('changes value of original string', () => {
        expect(capitalize('foo')).to.not.equal('foo');
    });
})