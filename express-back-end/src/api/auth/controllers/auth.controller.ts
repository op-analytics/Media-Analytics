import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '@/config';

import UserRequest from '../interfaces/UserRequest';
import {
  ConfirmEmail,
  EmailTaken,
  GetUser,
  PasswordsMatch,
  SendValidationEmail,
  Signup,
  TokenizeUser,
} from '../lib/auth';

interface ValidationErrorMessage {
  message: string;
  type: (string | number)[];
}

const createValidationError = (
  message: string,
  type: (string | number)[] = ['general'],
): ValidationErrorMessage => ({
  type,
  message,
});

export function home(_: Request, res: Response): void {
  res.json({ message: 'You reached auth' });
}

export async function signup(req: Request, res: Response): Promise<void> {
  const { email: emailDirty, name, password } = req.body;
  const email = emailDirty.toLowerCase();

  // Check email is not already taken
  if (await EmailTaken(email)) {
    res.status(422).json({
      errors: [createValidationError('Email already taken', ['email'])],
    });
    return;
  }

  // Try signup user but responed with an error if it fails
  try {
    const user = await Signup(name, email, password);
    SendValidationEmail(user.email);
    res.json({
      message:
        'User was created successfully go check your email for confirmation',
    });
    return;
  } catch (e) {
    res
      .status(500)
      .json(createValidationError('There was an error creating your user'));
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email: emailDirty, password } = req.body;
  const email = emailDirty.toLowerCase();

  // Try get user with the given email
  const user = await GetUser(email);

  if (!user || !(await PasswordsMatch(password, user.password))) {
    res
      .status(400)
      .json({ errors: [createValidationError('Incorrect information')] });
    return;
  }

  if (!user.confirmed) {
    res.status(400).json({
      errors: [createValidationError('Email has not yet been validated')],
    });
    return;
  }

  res.json({ token: TokenizeUser(user) });
}

export function getUser(req: UserRequest, res: Response): void {
  res.json({ data: { ...req.user } });
}

export async function resendConfirmationEmail(req: Request, res: Response): Promise<void> {
  const { email } = req.body;
  try {
    const user = await GetUser(email);
    if (!user) throw new Error()
    if (user.confirmed) throw new Error()
    SendValidationEmail(email);
  } catch (e) {
    res.status(400).json({
      errors: [createValidationError('There was a problem sending the confirmation email')],
    });
    return;
  }
  res.json({
    message:
      'Email was sent successfully go check your email for confirmation',
  });
}

export function confirmEmail(req: Request, res: Response): void {
  try {
    const {email} = jwt.verify(req.params.token, config.secret) as {email:string};
    ConfirmEmail(email);
  } catch (error) {
    res.status(400).json({
      errors: [createValidationError('There was an error verifying your email')],
    });
    return;
  }

  res.redirect(`${config.confirmationRedirect}`);
}
