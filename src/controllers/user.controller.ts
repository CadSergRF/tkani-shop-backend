import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

import DublicateErrors from '../errors/DublicateError.js';
import BadRequestError from '../errors/BadRequestError.js';
// import NotFoundError from '../errors/NotFoundError.js';
import { NextFunction, Request, Response } from 'express';

import { CREATED_CODE } from '../utils/constants/statusCode.constants.js';

const { NODE_ENV, JWT_SECRET } = process.env;

// const findUser = (req: Request, res: Response, data: string, next: NextFunction) => {
//   User.findById(data)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь с указанным id не найден');
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Передан не корректный id пользователя'));
//       } else {
//         next(err);
//       }
//     });
// };

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then(() => {
      res.status(CREATED_CODE).send({
        data: {
          name,
          about,
          avatar,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DublicateErrors('Пользователь с указанным email уже зарегистрирован.'));
        return;
      }
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors);
        // .map((error) => error.message)
        // .join(' ');
        next(new BadRequestError(`Не корректные данные при создании пользователя ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

module.exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const secretKey = NODE_ENV && JWT_SECRET && NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: '7d',
    });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    res.send({ message: 'Вы успешно авторизованы' });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Ошибка авторизации'));
    } else {
      next(err);
    }
  }
};

module.exports.logout = (req: Request, res: Response) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
