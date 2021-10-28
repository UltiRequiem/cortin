import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const {
  PASSWORD, DB, CLUSTER_NAME, SUBDOMAIN, DB_USERNAME,
} = process.env;
