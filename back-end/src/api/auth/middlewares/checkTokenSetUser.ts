import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../../../config';

import User from '../interfaces/User';
import UserRequest from '../interfaces/UserRequest';

/**
 * Separates the jwt from the prefix if the prefix existed
 *
 * @param header - The string you wish to separate the jwt from
 * @returns The jwt separated from the prefix if the prefix existed
 */
function getTokenFromBearer(header: string): string {
  const tokenSplit = header.split(' ');
  return tokenSplit.length > 1 ? tokenSplit[1] : tokenSplit[0];
}

/**
 * Gets the token from the Authorization header
 *
 * @param req - Express' request object
 * @returns The jwt from the Authorization header if it exists
 */
function getTokenFromRequest(req: Request): string | null {
  // Get the jwt from the authorization header in the request
  const bearer = req.get('Authorization');
  if (bearer) {
    // Split the token from the bearer prefix
    return getTokenFromBearer(bearer);
  }
  return null;
}

/**
 * Gets the user data from the Authorization header to set as the request user
 *
 * @param req - Express' request object
 * @param _ - Express' response object
 * @param next - Express' next function
 */
function checkTokenSetUser(
  req: UserRequest,
  _: Response,
  next: NextFunction,
): void {
  const token = getTokenFromRequest(req);
  if (token) {
    try {
      // Get the user data from the token and set it as the 
      // user on the request object
      const user = verify(token, config.secret);
      req.user = user as User;
      // Ignore errors as we are just trying to set the user on the request
      // eslint-disable-next-line no-empty
    } catch {}
  }
  next();
}

export default checkTokenSetUser;
