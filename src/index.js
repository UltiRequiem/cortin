import express, { json, text } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { PORT } from './config.js';
import { customLogger } from './utils.js';
import { V1Router, SimpleRouter } from './routes/index.js';
import {
  finalErrorHandler,
  loggerHandler,
  httpErrorsHandler,
} from './middlewares/index.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use(text());

app.use('/v1', V1Router);
app.use('/simple', SimpleRouter);

app.use(loggerHandler);
app.use(httpErrorsHandler);
app.use(finalErrorHandler);

app.listen(PORT, () => {
  customLogger.info(`Server is running at http://localhost:${PORT}`);
});
