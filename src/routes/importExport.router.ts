import express from 'express';
import product from '../controllers/products.controler.js'

const importExportRouter = express.Router();

importExportRouter.get('/', product.importToCSV);

export default importExportRouter;