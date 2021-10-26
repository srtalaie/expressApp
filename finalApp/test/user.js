let User = require('../models/user');

let chai = require('chai');
let expect = chai.expect;

describe('User', () => {

    let user;
    beforeEach(() => {
        user = new User({
            username: 'SAM_BEAN',
            password: 'Pass1234!',
            bio: 'String',
            displayName: 'HelloWorld',
            createdAt: Date.now
        })

        user2 = new User({
            username: 'HenloWorld',
            password: 'Pass1234!',
            bio: 'String',
            createdAt: Date.now
        })
    });

    it('can get displayname', () => {
        expect(user.name()).to.equal('HelloWorld');
    });

    it('get username if no displayname available', () => {
        expect(user2.name()).to.equal('HenloWorld')
    });
});