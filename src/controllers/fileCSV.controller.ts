import ProductItem from '../models/product.model.js';

import { Request, Response, NextFunction } from 'express';
import { Parser } from 'json2csv';
import { importExportModel } from '../config/importExport.config.js';
import fileParse from '../middleware/parceCSV.middleware.js';

const exportToCSV = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const cards = await ProductItem.find();
    const fields = importExportModel;
    const parser = new Parser({ fields });
    const csvExport = parser.parse(cards);

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
    fileParse();
    // const result = fileParse();
    res
      .status(200)
      .send({ message: 'Файл загружен' })
      // .send(result);
  } catch (err) {
    console.log('Ошибка в контроллере ', err)
    next;
  }
}

export default { exportToCSV, importFromCSV };