import express from 'express';
import product from '../controllers/products.controler.js';

const productRouter = express.Router();

productRouter.delete('/:id', product.deleteProduct);
productRouter.get('/', product.getAllProducts);
productRouter.post('/', product.createProduct);

export default productRouter;
