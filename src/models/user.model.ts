import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import AuthError from '../errors/AuthError.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Символов в названии должно быть от 3 до 30'],
      maxlength: [100, 'Символов в названии должно быть от 3 до 100'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
    phoneNumber: {
      type: String,
    },
    birthday: {
      type: String,
    },
    clientCard: {
      type: String,
    },
    address: {
      postIndex: { type: String },
      town: { type: String },
      streetHome: { type: String },
      apartment: { type: String },
      floor: { type: String },
      entrance: { type: String },
      intercom: { type: String },
    },
  },
  {
    versionKey: false,
    statics: {
      async findUserByCredentials(email, password) {
        const user = await this.findOne({ email }).select('+password');
        if (!user) {
          throw new AuthError('Неправильные почта или пароль');
        }
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          throw new AuthError('Неправильные почта или пароль');
        }
        return user;
      },
    },
  },
);

export default mongoose.model('user', userSchema);
