import CompanyInfo, { ICompany } from '../models/company.model.js';

import { Request, Response, NextFunction } from 'express';

const getCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await CompanyInfo.find<ICompany>();
    return res.send(company);
  } catch (err) {
    console.log(`Ошибка получения всех карточек ${err}`);
    next(err);
  }
};

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyParams = req.body;
    const findAnyCompany = await CompanyInfo.find<ICompany>();
    console.log('rjvgfyb', findAnyCompany);
    if (findAnyCompany && findAnyCompany.length === 0) {
      const newCompany = new CompanyInfo(companyParams);
      const company = await newCompany.save();
      res.status(200).json(company);
    }
    throw new Error('Компания уже существует. Нельзя создать вторую компанию');
  } catch (err) {
    console.log(`Ошибка создания новой компании ${err}`);
    next(err);
  }
};

export default { createCompany, getCompanyInfo };
