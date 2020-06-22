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

/**
 * Interface for a validation error message
 */
// FIXME: Separate this into a top level interfaces directory
interface ValidationErrorMessage {
  message: string;
  type: (string | number)[];
}

/**
 * Create a validation error from a message
 *
 * @param message - The joi schema to validate the body of the request against
 * @param type - The fields/types the error message belongs to
 * @returns A validation error message
 */
// FIXME: Separate this into a top level lib directory
const createValidationError = (
  message: string,
  type: (string | number)[] = ['general'],
): ValidationErrorMessage => ({
  type,
  message,
});

/**
 * Let a dev know where they are
 *
 * @param req - Express' request object
 * @param Response - Express' response object
 */
// TODO: Remove home routes
export function home(_: Request, res: Response): void {
  res.json({ message: 'You reached auth' });
}

/**
 * Signup a user and send a email to confirm the users email address
 *
 * @param req - Express' request object
 * @param Response - Express' response object
 */
export async function signup(req: Request, res: Response): Promise<void> {
  const { email: emailDirty, name, password } = req.body;
  // FIXME: The email is not being trimmed
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
    // Signup the user
    const user = await Signup(name, email, password);
    // Send a conformation email
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

/**
 * Login a user (Get the jwt access token)
 *
 * @param req - Express' request object
 * @param res - Express' response object
 */
export async function login(req: Request, res: Response): Promise<void> {
  const { email: emailDirty, password } = req.body;
  const email = emailDirty.toLowerCase();

  // Try get user with the given email
  const user = await GetUser(email);

  // When no matching user was found or when the passwords dont match
  if (!user || !(await PasswordsMatch(password, user.password))) {
    res
      .status(400)
      .json({ errors: [createValidationError('Incorrect information')] });
    return;
  }

  // If email was already confirmed
  if (!user.confirmed) {
    res.status(400).json({
      errors: [createValidationError('Email has not yet been validated')],
    });
    return;
  }

  // Return an access token containing safe user information
  res.json({ token: TokenizeUser(user) });
}

/**
 * Return the user data from the request object
 * @param req - Express' request object with a user property
 * @param res - Express' response object
 */
export function getUser(req: UserRequest, res: Response): void {
  res.json({ data: req.user });
}

/**
 * Resends a conformation email to the email in the request body
 *
 * @param req - Express' request object
 * @param res - Express' response object
 */
export async function resendConfirmationEmail(req: Request, res: Response): Promise<void> {
  const { email } = req.body;
  try {
    const user = await GetUser(email);
    // If there is no user associated with the email throw an error
    if (!user) throw new Error()
    // If the user is already confirmed throw an error
    if (user.confirmed) throw new Error()
    // Resend the validation email
    SendValidationEmail(email);
  } catch (e) {
    // If any errors were thrown above just say something went wrong
    res.status(400).json({
      errors: [createValidationError('There was a problem sending the confirmation email')],
    });
    return;
  }
  // Success message if the email was sent
  res.json({
    message:
      'Email was sent successfully go check your email for confirmation',
  });
}

/**
 * Confirms a users email address using the jwt encoded email found in the url params
 *
 * @param req - Express' request object
 * @param res - Express' response object
 */
export function confirmEmail(req: Request, res: Response): void {
  try {
    // Verify the jwt was issued by us. Return the email from the jwt if it was
    const {email} = jwt.verify(req.params.token, config.secret) as {email:string};
    // Confirm the email of the user if the jwt was valid
    ConfirmEmail(email);
  } catch (error) {
    //FIXME: A user will not see this message. This needs changed to a redirect
    // If something went wrong return an error message
    res.status(400).json({
      errors: [createValidationError('There was an error verifying your email')],
    });
    return;
  }

  // If the email was successfully validated redirect the user
  res.redirect(`${config.confirmationRedirect}`);
}
