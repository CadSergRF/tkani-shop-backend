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

const exportToCSV = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const cards = await ProductItem.find();
    const fields = importExportModel;
    const parser = new Parser({ fields });
    const csvExport = parser.parse(cards);
    console.log(csvExport)

    res
      .setHeader("Content-Type", "text/csv")
      .setHeader("Content-Disposition", "attachment: filename=productBase.csv")
      .status(200)
      .send(csvExport);

  } catch (err) {
    console.log(`Ошибка экспорта базы данных в csv: ${err}`);
    next;
  }
}

const importFromCSV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filedata = req.file;
    console.log('req ' + req)
    console.log(filedata);
    if (!filedata)
      res.send("Ошибка при загрузке файла");
    else
      res.send({ message: 'Файл загружен' });
  } catch (error) {
    console.log('Ошибка')
    next;
  }
}

export default { getAllProducts, createProduct, exportToCSV, importFromCSV };
// export default { getAllProducts, createProduct, exportToCSV };