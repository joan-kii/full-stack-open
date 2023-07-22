const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const config = require('./utils/config');
const logger = require('./utils/loggers');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

logger.info('Connecting to MongoDB');
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB: ', err.message);
  });

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
