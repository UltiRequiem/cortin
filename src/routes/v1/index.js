import { Router } from 'express';

import { DataBase } from '../../services/index.js';
import { validateSchemas } from '../../middlewares/index.js';
import { urlWithOptions } from '../../schemas/index.js';

const V1Router = Router();

V1Router.get('/:id', async ({ params: { id } }, response, next) => {
  try {
    const urlToRedirect = await DataBase.findByID(id);

    if (!urlToRedirect) {
      response.json({ message: `${id} does not exist.` });
    }

    response.redirect(await DataBase.findByID(id));
  } catch (error) {
    next(error);
  }
});

// Delete Later
V1Router.post(
  '/',
  validateSchemas(urlWithOptions, 'request.params'),
  async ({ params: { id, isPrivate } }, response, next) => {
    try {
      response.status(200).json(await DataBase.newLink(id, isPrivate));
    } catch (error) {
      next(error);
    }
  },
);

V1Router.get('/', async (_request, response, next) => {
  try {
    response.status(200).json(await DataBase.listAllLinks());
  } catch (error) {
    next(error);
  }
});

export default V1Router;
