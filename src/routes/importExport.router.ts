import express from 'express';
import product from '../controllers/products.controler.js';
import { uploadCSV } from '../middleware/uploadCSV.middleware.js';
// import fileParse from '../middleware/parceCSV.middleware.js';

const importExportRouter = express.Router();

importExportRouter
  .get('/', product.exportToCSV)
  .post('/', uploadCSV.single('filecsv'), product.importFromCSV);
// .post('/', uploadCSV.single('filecsv'), fileParse, product.importFromCSV);

export default importExportRouter;