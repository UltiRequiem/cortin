import { Router } from 'express';

import { DataBase } from '../services/index.js';

const RedirectRouter = Router();

RedirectRouter.get('/:id', async ({ params: { id } }, response, next) => {
  try {
    const urlToRedirect = await DataBase.getLink(id);

    if (!urlToRedirect) {
      response.json({ message: `${id} does not exist.` });
    }

    response.redirect(urlToRedirect);
  } catch (error) {
    next(error);
  }
});

export default RedirectRouter;
