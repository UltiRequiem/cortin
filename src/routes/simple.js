import { Router } from 'express';

import { validateSchemas } from '../middlewares/index.js';
import { DataBase } from '../services/index.js';
import { url } from '../schemas/index.js';

const SimpleRoute = Router();

SimpleRoute.post(
  '/',
  validateSchemas(url, 'body'),
  async ({ body }, response, next) => {
    try {
      const link = await DataBase.newLink(body);
      response.status(200).json({
        message: `Link "${body}" posted successfully.`,
        ...link,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default SimpleRoute;
