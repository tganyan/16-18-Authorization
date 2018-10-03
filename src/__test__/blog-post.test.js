'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const blogPostMock = require('./lib/blog-post-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/blog-posts`;

describe('api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(blogPostMock.pCleanBlogPostMocks);

  test('should respond with a 200 status code and an updated blog', () => {
    let savedMock;
    return blogPostMock.pCreateBlogPostMock()
      .then((mock) => {
        savedMock = mock;
        return superagent.put(`${API_URL}/${mock.blogPost._id}`)
          .send({
            title: 'A shiny new title',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.content).toEqual(savedMock.blogPost.content);
        expect(response.body.title).toEqual('A shiny new title');
        expect(response.body.category.toString()).toEqual(savedMock.category._id.toString());
      });
  });
});
