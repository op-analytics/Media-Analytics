import { model, Schema } from 'mongoose';

import UserDocument from '../interfaces/UserDocument';

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 100,
    },
    lastTokenResetDate: {
      type: Date,
      default: Date.now(),
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

User.path('email').validate((value: string) => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}, 'Invalid email');

export default model<UserDocument>('user', User);
