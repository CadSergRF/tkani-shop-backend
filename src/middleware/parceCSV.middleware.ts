import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

import { IProduct } from "../models/product.model.js";

const fileParse = async () => {

  const absPath = path.resolve('./')
  const csvFilePath = path.resolve(absPath, 'uploads/uploadDB.csv');

  const headers = ['articul', 'name', 'price', 'picture'];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  const result: IProduct[] = [];

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
    fromLine: 2,
    cast: (columnValue, context) => {
      if (context.column === 'price') {
        return parseInt(columnValue, 10);
      }
      return columnValue;
    }
  }, (error, result) => {
    if (error) {
      console.error('Parse error ' + error);
    }
    console.log("Parse CSV - Result", result);
  });

  return result;
}

export default fileParse;