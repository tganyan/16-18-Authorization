'use strict';

const superagent = require('superagent');
const faker = require('faker');
const server = require('../lib/server');
const guitarMock = require('./lib/guitar-mock');
const brandMock = require('./lib/brand-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/guitars`;

describe('api/brands', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(guitarMock.pCleanGuitarMocks);

  test('should respond with a 200 status code and an updated guitar', () => {
    let savedMock;
    return guitarMock.pCreateGuitarMock()
      .then((mock) => {
        savedMock = mock;
        return superagent.put(`${API_URL}/${mock.guitar._id}`)
          .send({
            type: 'A shiny new type',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.style).toEqual(savedMock.guitar.style);
        expect(response.body.type).toEqual('A shiny new type');
        expect(response.body.brand.toString()).toEqual(savedMock.brand._id.toString());
      });
  });

  test('should respond with a 200 status code and a guitar', () => {
    let savedMock;
    return guitarMock.pCreateGuitarMock()
      .then((mock) => {
        savedMock = mock;
        return superagent.get(`${API_URL}/${mock.guitar._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.style).toEqual(savedMock.guitar.style);
        expect(response.body.type).toEqual(savedMock.guitar.type);
        expect(response.body.brand.toString()).toEqual(savedMock.brand._id.toString());
      });
  });

  test('should respond with 200 status code and a new json guitar', () => {
    const originalRequest = {
      type: faker.lorem.words(2),
      style: faker.lorem.words(1),
    };
    let savedBrandMock = null;
    return brandMock.pCreateBrandMock()
      .then((createdBrandMock) => {
        savedBrandMock = createdBrandMock;
        originalRequest.brand = createdBrandMock._id;
        return superagent.post(API_URL)
          .set('Content-Type', 'application/json')
          .send(originalRequest);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.type).toEqual(originalRequest.type);
        expect(response.body.style).toEqual(originalRequest.style);
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.brand.toString()).toEqual(savedBrandMock._id.toString());
      });
  });
});
