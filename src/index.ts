import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { mongoConfig } from '../src/config/mongoConnect.config.js';

import router from './routes/index.routes.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`URL базы данных ${mongoConfig.mongo.url}`);
mongoose.connect(mongoConfig.mongo.url).then(
  () => {
    console.log(`Удачное подключение к базе данных: ${mongoConfig.mongo.dbName}`);
  },
  (err) => {
    console.log(`Ошибка подключения к базе данных ${err}`);
  },
);

app
  .use(express.json())
  .use(
    cors({
      origin: '*',
      credentials: true,
    }),
  )
  .use(express.urlencoded({ extended: true }))
  .use('/static', express.static(__dirname + '/pics'))
  .use(cookieParser())
  .use('/', router);

app.listen(mongoConfig.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${mongoConfig.server.port} порту`);
});
