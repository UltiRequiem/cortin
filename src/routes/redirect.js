import { Router } from 'express';

import { DataBase } from '../services/index.js';
import { tryNext } from '../utils.js';

const RedirectRouter = Router();

RedirectRouter.get('/:id', async ({ params: { id } }, response, next) => {
  tryNext(async () => {
    const urlToRedirect = await DataBase.getLink(id);

    if (!urlToRedirect) response.json({ message: `${id} does not exist.` });

    response.redirect(urlToRedirect);
  }, next);
});

export default RedirectRouter;
