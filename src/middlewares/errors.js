import { customLogger } from '../utils.js';

export function loggerHandler(error, _requt, _response, next) {
  customLogger.error(error);
  next(error);
}

export function httpErrorsHandler(error, _request, response, next) {
  if (error.isBoom) {
    response.json(error.output.payload);
  }

  next(error);
}

// eslint-disable-next-line no-unused-vars
export function finalErrorHandler(error, _request, response, _next) {
  response.status(500).json({ error, stack: error.stack });
}
