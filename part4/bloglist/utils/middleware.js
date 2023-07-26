const jwt = require('jsonwebtoken');

const logger = require('./loggers');

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
  return null;
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' });
};

const tokenExtractor = (request, _response, next) => {
  const token = request.get('authorization');
  if (token && token.startsWith('Bearer')) {
    request.token = token.replace('Bearer ', '');
  }
  next();
  return null;
};

const userExtractor = (request, _response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (decodedToken.id) {
    request.user = decodedToken;
  }
  next();
  return null;
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
  return null;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
