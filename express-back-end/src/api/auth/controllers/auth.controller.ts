import { Request, Response } from 'express';
import UserRequest from '../interfaces/UserRequest';
import {
  EmailTaken,
  Signup,
  TokenizeUser,
  GetUser,
  PasswordsMatch,
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
    res.json({ token: TokenizeUser(user) });
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

  res.json({ token: TokenizeUser(user) });
}

export function getUser(req: UserRequest, res: Response): void {
  res.json({ data: { ...req.user } });
}
