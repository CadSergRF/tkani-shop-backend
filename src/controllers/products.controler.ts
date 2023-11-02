import ProductItem, { IProduct } from '../models/product.model.js';

import { Request, Response, NextFunction } from 'express';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await ProductItem.find();
    return res.send(cards);
  } catch (err) {
    console.log(`Ошибка получения всех карточек ${err}`);
    next(err);
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardsParams = req.body;
    const findDuplicate = await ProductItem.find<IProduct>({ articul: req.body.articul });
    if (findDuplicate) {
      throw new Error('Карточка товара с указанным артикулом уже существует');
    }
    const newProduct = new ProductItem(cardsParams);
    const card = await newProduct.save();
    res.status(200).json(card);
  } catch (err) {
    console.log(`Ошибка создания новой карточки ${err}`);
    next(err);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await ProductItem.findById<IProduct>(req.params.id);
    if (!card) {
      throw new Error('Карточка с указанным id не найдена');
    }
    const cardDelete = await ProductItem.deleteOne(card);
    return res.send(cardDelete);
  } catch (err) {
    console.log(`Ошибка удаления карточки ${err}`);
    next(err);
  }
};

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await ProductItem.findById<IProduct>(req.body.id);
    if (!card) {
      throw new Error('Карточка с указанным id не найдена');
    }
    const cardDelete = await ProductItem.deleteOne(card);
    return res.send(cardDelete);
  } catch (err) {
    console.log(`Ошибка удаления карточки ${err}`);
    next(err);
  }
};

export default { getAllProducts, createProduct, deleteProduct, editProduct };
