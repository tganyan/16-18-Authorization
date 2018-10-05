'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Guitar = require('../model/guitar');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/guitars', jsonParser, (request, response, next) => {
  return new Guitar(request.body).save()
    .then((savedGuitar) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      response.json(savedGuitar);
    })
    .catch(error => next(error));
});

router.put('/api/guitars/:id', jsonParser, (request, response, next) => {
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Guitar.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((updatedGuitar) => {
      if (!updatedGuitar) {
        logger.log(logger.INFO, 'Responding with a 404 status code');
        return next(new HttpError(404, 'could not find guitar to update'));
      }
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(updatedGuitar);
    })
    .catch(error => next(error));
});

router.get('/api/guitars/:id', (request, response, next) => {
  return Guitar.findById(request.params.id)
    .then((guitar) => {
      if (guitar) {
        logger.log(logger.INFO, 'Responding with a 200 status code and a guitar');
        return response.json(guitar);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Guitar not found');
      return next(new HttpError(404, 'guitar not found'));
    })
    .catch(next);
});

router.delete('/api/guitars/:id', (request, response, next) => {
  return Guitar.findByIdAndDelete(request.params.id)
    .then((guitar) => {
      if (guitar) {
        logger.log(logger.INFO, 'Guitar has been found and removed.');
        return response.sendStatus(204);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Guitar not Found');
      return next(new HttpError(404, 'guitar not found'));
    })
    .catch(next);
});
