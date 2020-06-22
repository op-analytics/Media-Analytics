import { NextFunction, Response } from 'express';
import moment from 'moment';

import TokenHelper from '../auth/helpers/TokenHelper';
import UserRequest from '../auth/interfaces/UserRequest';
import * as Auth from '../auth/lib/auth';

/**
 * Send a validation email to a user
 *
 * @param req - Express' request object with a user property
 * @param _ - Express' response object
 * @param next - Express' next function
 */
async function resetTokensIfNeeded(
  req: UserRequest,
  _: Response,
  next: NextFunction,
): Promise<void> {
  // If there is a user check their tokens
  if (req.user) {
    // Get the users last reset date
    const lastUpdated = moment(req.user!!.lastTokenResetDate);
    // Get the current date
    const now = moment();
    // If it has been more than a month since they were reset
    if (lastUpdated.diff(now, 'months') > 0) {
      // Reset the tokens
      await TokenHelper.resetUserTokens(req.user!!);
      // Update the tokens reset date on the request user
      req.user.lastTokenResetDate = now.toString();
      // Update the tokens reset date in the database
      const user = await Auth.GetUser(req.user!!.email);
      user!!.lastTokenResetDate = now.toString();
      user?.save()
    }
  }
  // Continue
  next();
}

export default resetTokensIfNeeded;
