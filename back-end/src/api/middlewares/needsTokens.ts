import { NextFunction, Response } from 'express';

import TokenHelper from '../auth/helpers/TokenHelper';
import UserRequest from '../auth/interfaces/UserRequest';

/**
 * Middleware to check if the user has tokens before letting them through
 *
 * @param req - Express' request object with a user property
 * @param _ - Express' response object
 * @param next - Express' next function
 */
async function needsTokens(
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // Check if the user on the request has tokens
  if (!(await TokenHelper.userHasTokens(req.user!!)))
    // If there is no tokens return an error
    // FIXME: This should return a validation error. If left like this the user wont see it
    res.status(429).json({
      message: 'No tokens available to make this request',
    });
  // Let the user through if the have tokens
  else next();
}

export default needsTokens;
