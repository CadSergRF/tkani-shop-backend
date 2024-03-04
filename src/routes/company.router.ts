import express from 'express';
import company from '../controllers/company.controller.js';
const companyRouter = express.Router();

companyRouter.post('/', company.createCompany);
companyRouter.get('/', company.getCompanyInfo);

export default companyRouter;
