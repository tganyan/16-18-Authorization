'use strict';

const faker = require('faker');
const superagent = require('superagent');
const accountMock = require('./lib/account-mock');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}/api/signup`;

describe('AUTH ROUTER', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should return a 200 status code and a token', () => {
    return superagent.post(API_URL)
      .send({
        username: faker.internet.username(1),
        password: faker.internet.password(),
        email: faker.internet.email(),
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('should return a 200 status code and a token if you login', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.get(`${API_URL}/api/login`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
});
