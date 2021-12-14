import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express, { json, text, static as staticMiddleware } from 'express';
import cors from 'cors';
import favicon from 'serve-favicon';
import helmet from 'helmet';

import { PORT, FRONTEND } from './config.js';
import { customLogger } from './utils.js';
import { V1Router, SimpleRouter, RedirectRouter } from './routes/index.js';
import {
  finalErrorHandler,
  loggerHandler,
  httpErrorsHandler,
} from './middleware/index.js';

const app = express();

app.set('json spaces', 2);

app.use(
  favicon(
    join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      'www',
      'public',
      'favicon.jpg',
    ),
  ),
);

app.use(cors());
app.use(helmet());
app.use(json());
app.use(text());

if (FRONTEND === 'yes') {
  app.use(staticMiddleware('www/dist'));
  customLogger.info('Static files served!');
}

app.use('/', SimpleRouter);
app.use('/v1', V1Router);
app.use('/', RedirectRouter);

app.use(loggerHandler);
app.use(httpErrorsHandler);
app.use(finalErrorHandler);

app.listen(PORT, () => {
  customLogger.info(`Server is running at http://localhost:${PORT}`);
});
