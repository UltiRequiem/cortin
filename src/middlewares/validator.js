import boom from '@hapi/boom';

// eslint-disable-next-line import/prefer-default-export
export function validateSchemas(schema, property) {
  return (request, _response, next) => {
    const data = request[property];
    const { error } = schema.validate(data);

    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}
