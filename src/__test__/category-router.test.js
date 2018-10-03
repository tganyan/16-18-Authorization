'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const categoryMock = require('./lib/category-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/categories`;

describe('/api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(categoryMock.p_CleanCategoryMock);

  test('should respond with 200 status code and a new json category', () => {
    const originalRequest = {
      title: faker.lorem.words(2),
      content: faker.lorem.words(10),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.content).toEqual(originalRequest.content);
        expect(response.body.title).toEqual(originalRequest.title);
        expect(response.body.timestamp).toBeTruth();
        expect(response.body._id.toString()).toBeTruthy();
      });
  });

  test('should respond with 200 status code and a json category if there is a matching id', () => {
    let savedCategoryMock = null;
    return categoryMock.pCreateCategoryMock()
      .then((createdCategoryMock) => {
        savedCategoryMock = createdCategoryMock;
        return superagent.get(`${API_URL}/${createdCategoryMock._id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body.timestamp).toBeTruthy();
        expect(getResponse.body._id.toString()).toEqual(savedCategoryMock._id.toString());
        expect(getResponse.body.title).toEqual(savedCategoryMock.title);
      });
  });
});
