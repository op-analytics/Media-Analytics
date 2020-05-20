import { Response, NextFunction } from 'express';
import { UserRequest } from '../types';

function ensureLoggedIn(
  req: UserRequest,
  res: Response,
  next: NextFunction,
): void {
  if (req.user && req.user._id) next();
  else {
    res.status(401);
    res.json({ message: 'UnAuthorized' });
  }
}

export default ensureLoggedIn;
