'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Category = require('../model/category');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/categories', jsonParser, (request, response, next) => {
  return new Category(request.body).save()
    .then((savedCategory) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(savedCategory);
    })
    .catch(next);
});

router.get('/api/categories/:id', (request, response, next) => {
  return Category.findById(request.params.id)
    .then((category) => {
      if (category) {
        logger.log(logger.INFO, 'Responding with a 200 status code and a category');
        return response.json(category);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Category not found');
      return next(new HttpError(404, 'category not found'));
    })
    .catch(next);
});
