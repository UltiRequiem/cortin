import boom from '@hapi/boom';
import dotProp from 'dot-prop';

export default function validateSchemas(schema, property) {
  return (request, _response, next) => {
    const data = dotProp.get(request, property);

    const { error } = schema.validate(data);

    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}
