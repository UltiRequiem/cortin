import { Router } from 'express';

import { DataBase } from '../services/index.js';

const redirecter = Router();

redirecter.get('/:id', async ({ params: { id } }, response, next) => {
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

export default redirecter;
