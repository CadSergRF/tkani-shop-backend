import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

import ProductItem, { IProduct } from '../models/product.model.js';
import { ParsedToReal } from '../helpers/parsedCardTorealCard.js';

const fileParse = async () => {
  const absPath = path.resolve('./');
  const csvFilePath = path.resolve(absPath, 'uploads/uploadDB.csv');

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  const parsedData = Papa.parse<IProduct[]>(fileContent, {
    header: true,
    dynamicTyping: true,
  });
  const arrayParsedCards: IProduct[] = [];
  parsedData.data.forEach((item) => arrayParsedCards.push(ParsedToReal(item)));
  arrayParsedCards.splice(-1, 1);
  arrayParsedCards.forEach(async (card) => {
    const findDuplicate = await ProductItem.findOne<IProduct>({ articul: card.articul });
    if (findDuplicate) {
      console.log('Дубликат', findDuplicate.articul);
    } else {
      const newProduct = new ProductItem(card);
      newProduct.save();
    }
  });
};

export default fileParse;
