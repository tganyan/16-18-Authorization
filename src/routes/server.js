'use strict';

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger');
const loggerMiddleware = require('./logger-middleware');
const errorMiddleware = require('./error-middleware');
const mountainRoutes = require('../routes/mountain-router');
const regionRoutes = require('../routes/region-router');

const app = express();

app.use(loggerMiddleware);
app.use(mountainRoutes);
app.use(regionRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from default route (route was not found)');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const server = module.exports = {};
let internalServer = null;

server.start = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      return internalServer = app.listen(process.env.PORT, () => { // eslint-disable-line
        logger.log(logger.INFO, `Server is on at PORT: ${process.env.PORT}`);
      });
    });
};

server.stop = () => {
  return mongoose.disconnect()
    .then(() => {
      return internalServer.close(() => {
        logger.log(logger.INFO, 'The server is off.');
      });
    });
};
