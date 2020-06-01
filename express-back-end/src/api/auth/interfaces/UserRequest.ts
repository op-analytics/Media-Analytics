import { Request } from 'express';

import User from './User';

export default interface UserRequest extends Request {
  user?: User;
}
