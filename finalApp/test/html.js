let app = require('./testApp');

let supertest = require('supertest');
let cheerio = require('cheerio');

describe('html response', () => {
    let request;
    beforeEach(() => {
        request = supertest(app)
            .get('/')
            .set('User-Agent', 'a cool browser')
            .set('Accept', 'text/html')
    });

    it('returns an HTML response', (done) => {
        request
            .expect('Content-Type', /html/)
            .expect(200)
            .end(done)
    });

    it('returns your User Agent', (done) => {
        request
            .expect((res) => {
                let htmlResponse = res.text;
                let $ = cheerio.load(htmlResponse);
                let userAgent = $('.user-agent').html().trim();
                if (userAgent !== 'a cool browser') {
                    throw new Error("User Agent not found");
                }
            })
            .end(done)
    });
})
