import express from 'express';
import filecsv from '../controllers/fileCSV.controller.js'
import { uploadCSV } from '../middleware/uploadCSV.middleware.js';

const importExportRouter = express.Router();

importExportRouter
  .get('/', filecsv.exportToCSV)
  .post('/', uploadCSV.single('filecsv'), filecsv.importFromCSV);

export default importExportRouter;