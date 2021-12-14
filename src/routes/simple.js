import { Router } from 'express';

import { validateSchemasHandler } from '../handlers/index.js';
import { DataBase } from '../services/index.js';
import { url } from '../schemas/index.js';
import { URL_DEPLOY } from '../config.js';
import { tryNext } from '../utils.js';

const SimpleRoute = Router();

SimpleRoute.post(
  '/',
  validateSchemasHandler(url, 'body'),
  async ({ body }, response, next) => {
    tryNext(async () => {
      const link = await DataBase.newLink(body);
      response.status(200).json({
        message: `Link "${body}" posted successfully.`,
        url: link.url,
        // eslint-disable-next-line no-underscore-dangle
        shortLink: `${URL_DEPLOY}/${link._id}`,
      });
    }, next);
  },
);

export default SimpleRoute;
