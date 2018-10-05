'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const brandMock = require('./lib/brand-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/brands`;

describe('/api/brands', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(brandMock.pCleanBrandMocks);

  test('should respond with 200 status code and a new json brand', () => {
    const originalRequest = {
      name: faker.lorem.words(2),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(originalRequest.name);
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body._id.toString()).toBeTruthy();
      });
  });

  test('should respond with 200 status code and a json brand if there is a matching id', () => {
    let savedBrandMock = null;
    return brandMock.pCreateBrandMock()
      .then((createdCBrandMock) => {
        savedBrandMock = createdCBrandMock;
        return superagent.get(`${API_URL}/${createdCBrandMock._id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body.timestamp).toBeTruthy();
        expect(getResponse.body._id.toString()).toEqual(savedBrandMock._id.toString());
        expect(getResponse.body.name).toEqual(savedBrandMock.name);
      });
  });
});
