import express from 'express';
import productRouter from './product.router.js';
import importExportRouter from './importExport.router.js';

const adminRoutes = express.Router();

adminRoutes
  .use('/products', productRouter)
  .use('/importexport', importExportRouter);

export default adminRoutes;