import { Router } from 'express';

import { DataBase } from '../../services/index.js';
import { validateSchemasHandler } from '../../handlers/index.js';
import { urlWithOptions } from '../../schemas/index.js';
import { URL_DEPLOY } from '../../config.js';
import { tryNext } from '../../utils.js';

const V1Router = Router();

V1Router.get('/', async (_request, response, next) => {
  await tryNext(async () => response.status(200).json(await DataBase.listAllLinks()), next);
});

V1Router.get('/:id', async ({ params }, response, next) => {
  await tryNext(async () => response.status(200).json(await DataBase.findByID(params.id)), next);
});

V1Router.post(
  '/',
  validateSchemasHandler(urlWithOptions, 'body'),
  async ({ body: { url, private: isPrivate } }, response, next) => {
    await tryNext(async () => {
      const link = await DataBase.newLink(url, isPrivate);
      response.status(200).json({
        message: `Link "${url}" posted successfully.`,
        url: link.url,
        private: link.private || false,
        // eslint-disable-next-line no-underscore-dangle
        shortLink: `${URL_DEPLOY}/${link._id}`,
      });
    }, next);
  },
);

export default V1Router;
