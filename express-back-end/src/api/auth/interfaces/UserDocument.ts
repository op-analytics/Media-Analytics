import { Document } from 'mongoose';

export default interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}
