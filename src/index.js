import express, { json, text } from 'express';
import cors from 'cors';

import { PORT } from './config.js';
import { createLogger } from './utils.js';
import { V1Router } from './routes/index.js';

const logger = createLogger();
const app = express();

app.use(cors());

app.use(json());

app.use(text());

app.use('/v1', V1Router);

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
