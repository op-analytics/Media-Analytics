import { NextFunction, Response } from 'express';
import moment from 'moment';

import TokenHelper from '../auth/helpers/TokenHelper';
import UserRequest from '../auth/interfaces/UserRequest';
import * as Auth from '../auth/lib/auth';

async function resetTokensIfNeeded(
  req: UserRequest,
  _: Response,
  next: NextFunction,
): Promise<void> {
  if (req.user) {
    const lastUpdated = moment(req.user!!.lastTokenResetDate);
    const now = moment();
    if (lastUpdated.diff(now, 'months') > 0) {
      await TokenHelper.resetUserTokens(req.user!!);
      req.user.lastTokenResetDate = now.toString();
      const user = await Auth.GetUser(req.user!!.email);
      user!!.lastTokenResetDate = now.toString();
    }
  }
  next();
}

export default resetTokensIfNeeded;
