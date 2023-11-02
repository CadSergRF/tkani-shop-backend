import { Schema, model, Types } from 'mongoose';

export interface IProduct {
  articul: string; // Артикул
  name: string; // Наименование
  price: number; // Цена за единицу
  oldPrice?: number; // "Старая цена" - для акций
  quantity?: number; // Количество, остаток
  picture?: string; // Изображение товара
  description?: string; // Описание товара
  characteristic?: {
    width?: number; // Ширина
    picture?: string; // Рисунок
    color?: string; // Основной цвет
    counryOfOrigin?: string; // Страна производитель
    composition?: string; // Состав ткани
    weight?: number; // Плотность или вес за единицу измерения
  };
  seoTags?: {
    header?: string; // Заголовок
    description?: string; // Описание
    keyWords?: Types.Array<string>; // Ключевые слова
  };
}

const productSchema = new Schema<IProduct>(
  {
    articul: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    quantity: Number,
    picture: String,
    description: String,
    characteristic: {
      width: Number,
      picture: String,
      color: String,
      counryOfOrigin: String,
      composition: String,
      weight: Number,
    },
    seoTags: {
      header: String,
      description: String,
      keyWords: [String],
    },
  },
  {
    versionKey: false,
  },
);

export default model<IProduct>('ProductItem', productSchema);
