import express from 'express';
import companyRouter from './company.router.js';
import productRouter from './product.router.js';
import importExportRouter from './importExport.router.js';

const adminRoutes = express.Router();

adminRoutes
  .use('/company-info', companyRouter)
  .use('/products', productRouter)
  .use('/importexport', importExportRouter);

export default adminRoutes;
