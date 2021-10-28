import { Router } from 'express';

import { DataBase } from '../../services/index.js';
import { validateSchemas } from '../../middlewares/index.js';
import { url } from '../../schemas/index.js';

const V1Router = Router();

V1Router.get('/:id', async ({ params: { id } }, response, next) => {
  try {
    response.redirect(await DataBase.findByID(id));
  } catch (error) {
    next(error);
  }
});

// Delete Later
V1Router.delete('/:id', async ({ params: { id } }, response, next) => {
  try {
    response.status(200).json(await DataBase.deleteByID(id));
  } catch (error) {
    next(error);
  }
});

V1Router.get('/', async (request, response, next) => {
  try {
    response.status(200).json(await DataBase.listAllLinks());
  } catch (error) {
    next(error);
  }
});

V1Router.post(
  '/simple',
  validateSchemas(url, 'body'),
  async ({ body }, response, next) => {
    try {
      await DataBase.newLink(body);
      response.status(200).json({ message: `${body} posted successfully.` });
    } catch (error) {
      next(error);
    }
  },
);

export default V1Router;
