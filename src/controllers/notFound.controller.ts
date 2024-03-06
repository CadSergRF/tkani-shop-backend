import { NextFunction, Request, Response } from 'express';

import NotFoundError from '../errors/NotFoundError.js';

const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('URL не существует'));
};

export default urlNotFound;
