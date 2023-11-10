import express from 'express';
import product from '../controllers/products.controller.js';
import { uploadImage } from '../middleware/uploadImage.middleware.js';
// import multer from 'multer';
// const upload = multer({ dest: 'uploadsImg/' });
const productRouter = express.Router();

productRouter.delete('/:id', product.deleteProduct);
productRouter.get('/', product.getAllProducts);
productRouter.post('/', product.createProduct);
// productRouter.post('/file-image', upload.single('cardImage'), (req, res) => {
//   res.send('File uploaded successfully!');
// });
productRouter.post('/file-image', uploadImage.single('cardImage'), product.uploadImageProduct);
productRouter.patch('/', product.editProduct);

export default productRouter;
