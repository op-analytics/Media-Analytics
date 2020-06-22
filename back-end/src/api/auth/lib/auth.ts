import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../../config';

import EmailHelper from '../helpers/EmailHelper';
import UserType from '../interfaces/User';
import UserDocument from '../interfaces/UserDocument';
import User from '../models/user.model';

/**
 * Create and sign a jwt token containing safe user information
 * @param user - User object to extract payload data from
 * @returns A signed jwt containing safe user information
 */
function TokenizeUser(user: UserType): string {
  // TODO: Check if this needs to be awaited
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      limit: user.limit,
      lastTokenResetDate: user.lastTokenResetDate,
    },
    config.secret,
    {
      expiresIn: '4h',
    },
  );
}

/**
 * Gets and returns user from db with the given email
 *
 * @param email - Email of the potential user
 * @returns User document from db or null
 */
async function GetUser(email: string): Promise<UserDocument | null> {
  return User.findOne({ email }).exec();
}

/**
 * Check if an email is already tied to a registered account
 *
 * @param email - Email of the potential user
 * @returns Whether or not the email is tied to an account
 */
async function EmailTaken(email: string): Promise<boolean> {
  return Boolean(await GetUser(email));
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Checks wether a password is the same as an encrypted password
 *
 * @param unhashed - Password to compare
 * @param hashed - Hashed password to compare to
 * @returns Whether or not the passwords matched
 */
async function PasswordsMatch(
  unhashed: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(unhashed, hashed);
}

/**
 * Send a validation email to a user
 *
 * @param email - Email of the user to be confirmed
 */
function SendValidationEmail(email: string): void {
  EmailHelper.sendConfirmationEmail(email);
}

async function ConfirmEmail(email: string): Promise<void> {
  const user = await GetUser(email);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user!!.confirmed = true;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await user!!.save();
}

/**
 * Signup a user
 *
 * @param name - Name of the user to be signed up
 * @param email - Email of the user to be signed up
 * @param password - Password of the user to be signed up
 */
async function Signup(
  name: string,
  email: string,
  password: string,
): Promise<UserDocument> {
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  return user.save();
}

export {
  TokenizeUser,
  Signup,
  GetUser,
  PasswordsMatch,
  EmailTaken,
  ConfirmEmail,
  SendValidationEmail,
};
