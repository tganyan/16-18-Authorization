'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const guitarMock = require('./lib/guitar-mock');

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
});
