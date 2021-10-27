import mongoose from 'mongoose';
import express, { json, text } from 'express';

import cors from 'cors';

import {
  PORT, USERNAME, PASSWORD, DB, CLUSTER_NAME, SUBDOMAIN,
} from './config.js';

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_NAME}.${SUBDOMAIN}.mongodb.net/${DB}?retryWrites=true&w=majority`;

mongoose.connect(URI, {}).then(() => {
  console.log('MongoDB Connected');
});

const Link = mongoose.model('link', { url: String });

const app = express();

app.use(cors());

app.use(json());

app.use(text());

app.post('/v1', async ({ body }, response) => {
  console.log(body);
  await new Link({ url: String(body) }).save();
  response.send({ message: `Link ${String(body)} saved` });
});

app.use('/', async (request, response) => {
  response.send(await Link.find());
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
