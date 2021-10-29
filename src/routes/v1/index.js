import { Router } from 'express';

import { DataBase } from '../../services/index.js';
import { validateSchemasHandler } from '../../handlers/index.js';
import { urlWithOptions } from '../../schemas/index.js';
import { URL_DEPLOY } from '../../config.js';

const V1Router = Router();

V1Router.get('/', async (_request, response, next) => {
  try {
    response.status(200).json(await DataBase.listAllLinks());
  } catch (error) {
    next(error);
  }
});

V1Router.get('/:id', async ({ params }, response, next) => {
  try {
    response.status(200).json(await DataBase.findByID(params.id));
  } catch (error) {
    next(error);
  }
});

V1Router.post(
  '/',
  validateSchemasHandler(urlWithOptions, 'body'),
  async ({ body: { url, isPrivate } }, response, next) => {
    try {
      const link = await DataBase.newLink(url, isPrivate);
      response.status(200).json({
        message: `Link "${url}" posted successfully.`,
        url: link.url,
        isPrivate: link.isPrivate || false,
        // eslint-disable-next-line no-underscore-dangle
        shortLink: `${URL_DEPLOY}/${link._id}`,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default V1Router;
