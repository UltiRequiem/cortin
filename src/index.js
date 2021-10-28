import express, { json, text } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { PORT } from './config.js';
import { createLogger } from './utils.js';
import { V1Router } from './routes/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/index.js';

const logger = createLogger();
const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use(text());

app.use('/v1', V1Router);

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
