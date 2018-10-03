'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Account = require('../model/account');
const logger = require('../lib/logger');
const basicAuthMiddleware = require('../lib/basic-auth-middleware');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/signup', jsonParser, (request, response, next) => {
  if (!request.body.password) {
    return next(new HttpError(401, 'Please provide a password'));
  }
  return Account.create(request.body.username, request.body.email.request.body.password)
    .then((createdAccount) => {
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH: creating token');
      return createdAccount.p_CreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'Responding with 200 status code and a token');
      return response.json({ token });
    })
    .catch(next);
});

router.get('/api/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'Bad request'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a token');
      return response.json({ token });
    })
    .catch(next);
});
