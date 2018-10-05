'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Brand = require('../model/brand');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/brands', jsonParser, (request, response, next) => {
  return new Brand(request.body).save()
    .then((savedBrand) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(savedBrand);
    })
    .catch(next);
});

router.get('/api/brands/:id', (request, response, next) => {
  return Brand.findById(request.params.id)
    .then((brand) => {
      if (brand) {
        logger.log(logger.INFO, 'Responding with a 200 status code and a brand');
        return response.json(brand);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Brand not found');
      return next(new HttpError(404, 'brand not found'));
    })
    .catch(next);
});

router.put('/api/brands/:id', jsonParser, (request, response, next) => {
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Brand.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((updatedBrand) => {
      if (!updatedBrand) {
        logger.log(logger.INFO, 'Responding with a 404 status code');
        return next(new HttpError(404, 'could not find brand to update'));
      }
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(updatedBrand);
    })
    .catch(error => next(error));
});

router.delete('/api/brands/:id', (request, response, next) => {
  return Brand.findByIdAndDelete(request.params.id)
    .then((brand) => {
      if (brand) {
        logger.log(logger.INFO, 'Brand has been found and removed.');
        return response.sendStatus(204);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Brand not Found');
      return next(new HttpError(404, 'brand not found'));
    })
    .catch(next);
});
