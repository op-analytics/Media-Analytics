import { NextFunction, Response } from 'express';

import UserRequest from '../interfaces/UserRequest';

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