import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

import { IProduct } from '../models/product.model.js';

const fileParse = async () => {
  const absPath = path.resolve('./');
  const csvFilePath = path.resolve(absPath, 'uploads/uploadDB.csv');

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  const parsedData = Papa.parse<IProduct[]>(fileContent, {
    header: true,
    dynamicTyping: true,
    complete: (results) => console.log(results),
  });

  console.log('ParseData', parsedData);
};

export default fileParse;
