import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const FRONTEND = process.env.FRONTEND || 'yes';
export const URL_DEPLOY = 'https://cortin.herokuapp.com';

export const {
  PASSWORD, DB, CLUSTER_NAME, SUBDOMAIN, DB_USERNAME,
} = process.env;
