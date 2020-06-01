import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '@/config';

import User from '../interfaces/User';
import UserRequest from '../interfaces/UserRequest';

function getTokenFromBearer(header: string): string {
  const tokenSplit = header.split(' ');
  return tokenSplit.length > 1 ? tokenSplit[1] : tokenSplit[0];
}

function getTokenFromRequest(req: Request): string | null {
  const bearer = req.get('Authorization');
  if (bearer) {
    return getTokenFromBearer(bearer);
  }
  return null;
}

function checkTokenSetUser(
  req: UserRequest,
  _: Response,
  next: NextFunction,
): void {
  const token = getTokenFromRequest(req);
  if (token) {
    try {
      const user = verify(token, config.secret);
      req.user = user as User;
      // Ignore errors as we are just trying to set the user on the request
      // eslint-disable-next-line no-empty
    } catch {}
  }
  next();
}

export default checkTokenSetUser;
