import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../../config';

import EmailHelper from '../helpers/EmailHelper';
import UserType from '../interfaces/User';
import UserDocument from '../interfaces/UserDocument';
import User from '../models/user.model';

function TokenizeUser(user: UserType): string {
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

async function GetUser(email: string): Promise<UserDocument | null> {
  return User.findOne({ email }).exec();
}

async function EmailTaken(email: string): Promise<boolean> {
  return Boolean(await GetUser(email));
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function PasswordsMatch(
  unhashed: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(unhashed, hashed);
}

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
