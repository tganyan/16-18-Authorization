'use strict';

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger');
const loggerMiddleware = require('./logger-middleware');
const errorMiddleware = require('./error-middleware');

const brandRoutes = require('../routes/brand-router');
const guitarRoutes = require('../routes/guitar-router');
const authRoutes = require('../routes/auth-router');

const app = express();

app.use(loggerMiddleware);

app.use(brandRoutes);
app.use(guitarRoutes);
app.use(authRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from catch-all/default route (the route was not found');
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
        logger.log(logger.INFO, 'The server is OFF.');
      });
    });
};
