import express from 'express';
import product from '../controllers/products.controller.js';
import { uploadImage } from '../middleware/uploadImage.middleware.js';
const productRouter = express.Router();

productRouter.delete('/:id', product.deleteProduct);
productRouter.get('/', product.getAllProducts);
productRouter.post('/', product.createProduct);
productRouter.post('/file-image', uploadImage.single('cardImage'), product.uploadImageProduct);
productRouter.patch('/', product.editProduct);

export default productRouter;
