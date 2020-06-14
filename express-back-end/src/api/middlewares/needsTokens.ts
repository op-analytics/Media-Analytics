import { NextFunction, Response } from 'express';

import TokenHelper from '../auth/helpers/TokenHelper';
import UserRequest from '../auth/interfaces/UserRequest';

async function needsTokens(
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!(await TokenHelper.userHasTokens(req.user!!)))
    res.status(429).json({
      message: 'No tokens available to make this request',
    });
  else next();
}

export default needsTokens;
