import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  articul: string,
  name: string,
  price: number,
  picture: string
}

const productSchema: Schema = new Schema(
  {
    articul: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true }
  },
  {
    versionKey: false,
  },
);

export default model<IProduct>('ProductItem', productSchema);
