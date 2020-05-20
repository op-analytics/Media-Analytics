import { Document, Schema, model } from 'mongoose';

const User = new Schema({
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
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
});

User.path('email').validate((value: string) => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}, 'Invalid email');

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export default model<UserDocument>('user', User);
