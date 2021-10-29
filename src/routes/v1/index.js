import { Router } from 'express';

import { DataBase } from '../../services/index.js';

const V1Router = Router();

V1Router.get('/', async (_request, response, next) => {
  try {
    response.status(200).json(await DataBase.listAllLinks());
  } catch (error) {
    next(error);
  }
});

export default V1Router;
