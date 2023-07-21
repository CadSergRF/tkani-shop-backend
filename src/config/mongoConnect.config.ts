import dotenv from 'dotenv';

dotenv.config();

const MONGO_HOST = process.env.MONGO_DB_HOST;
const MONGO_NAME = process.env.MONGO_DB_NAME;

const MONGO_URL: string = `${MONGO_HOST}${MONGO_NAME}` || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

export const mongoConfig = {
  mongo: {
    dbName: MONGO_NAME,
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};