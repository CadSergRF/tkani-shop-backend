import ProductItem from '../models/product.model.js';

import { Request, Response, NextFunction } from 'express';
import { Parser } from 'json2csv';
import { importExportModel } from '../config/importExport.config.js';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await ProductItem.find();
    return res.send(cards);
  } catch (err) {
    console.log(`Ошибка получения всех карточек ${err}`);
    next;
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    articul,
    name,
    price,
    picture,
  } = req.body;

  const newProduct = new ProductItem({
    articul,
    name,
    price,
    picture,
  });

  try {
    const card = await newProduct.save();
    res.status(200).json({ card });
  } catch (err) {
    console.log(`Ошибка создания новой карточки ${err}`);
    next;
  }
};

const importToCSV = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const cards = await ProductItem.find();
    const fields = importExportModel;
    const parser = new Parser({ fields });
    const csvExport = parser.parse(cards);

    res
      .setHeader("Content-Type", "text/csv")
      .setHeader("Content-Disposition", "attachment: filename=productBase.csv")
      .status(200)
      .end(csvExport);

  } catch (err) {
    console.log(`Ошибка экспорта базы данных в csv: ${err}`);
    next;
  }
}

export default { getAllProducts, createProduct, importToCSV };