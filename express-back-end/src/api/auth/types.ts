import { Request } from 'express';

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface UserRequest extends Request {
  user?: User;
}
