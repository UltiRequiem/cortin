import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;

const {
  PASSWORD, DB, CLUSTER_NAME, SUBDOMAIN, DB_USERNAME,
} = process.env;

export const URI = `mongodb+srv://${DB_USERNAME}:${PASSWORD}@${CLUSTER_NAME}.${SUBDOMAIN}.mongodb.net/${DB}?retryWrites=true&w=majority`;
