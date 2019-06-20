const supertest = require('supertest');

const server = require('./server.js');

describe('server', () => {

  describe('GET /', () => {
    // asynchronous test need to either return the promise
    it('responds with 200 OK', () => {
      return supertest(server)
        .get('/')
        .expect(200);
    });

    // or use the squad async/await
    it('responds with 200 OK', async () => {
      await supertest(server)
        .get('/')
        .expect('Content-Type', /json/i);
    });

    // using done
    it('responds with correct status', done => {
      supertest(server)
        .get('/')
        .expect(200, done);
    });

    it('responds { api: "up" }', async () => {
      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: 'up' });
        });
    });
  });

  describe('POST /', () => {
    it('responds with 201', () => {
      return supertest(server)
        .post('/users')
        .send({name: "Jonathan"})
        .expect(201);
    });
    it('responds with json', () => {
      return supertest(server)
        .post('/users')
        .send({name: "Jonathan"})
        .expect('Content-Type', /json/);
    });
  });
});
