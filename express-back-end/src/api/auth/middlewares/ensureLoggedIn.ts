import { NextFunction, Response } from 'express';

import UserRequest from '../interfaces/UserRequest';

/**
 * Middleware to check the user is logged in before allowing them past
 *
 * @param req - Express' request object
 * @param res - Express' response object
 * @param next - Express' next function
 */
function ensureLoggedIn(
  req: UserRequest,
  res: Response,
  next: NextFunction,
): void {
  // If there is a user on the request allow them through
  if (req.user && req.user._id) next();
  // If there is no user on the request return a message telling them 
  // they are unauthorized
  else {
    res.status(401);
    res.json({ message: 'UnAuthorized' });
  }
}

export default ensureLoggedIn;
