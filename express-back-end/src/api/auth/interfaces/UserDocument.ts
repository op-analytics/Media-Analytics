import { Document } from 'mongoose';

export default interface UserDocument extends Document {
  name: string;
  email: string;
  limit: number;
  password: string;
  confirmed: boolean;
  lastTokenResetDate: string;
  createdAt: string;
  updatedAt: string;
}