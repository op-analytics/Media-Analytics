import { Router } from 'express';

import { validateBody } from '../middlewares';
import { AuthController } from './controllers';
import { ensureLoggedIn } from './middlewares';
import {
  LoginSchema,
  ResendConfirmationEmailSchema,
  SignupSchema,
} from './schemas';

import resetTokensIfNeeded from '../middlewares/resetTokensIfNeeded';

const router = Router();

router.get('/', AuthController.home);

router.post('/signup', validateBody(SignupSchema), AuthController.signup);

router.post('/login', validateBody(LoginSchema), AuthController.login);

router.get('/user', [ensureLoggedIn,resetTokensIfNeeded], AuthController.getUser);

router.get('/confirm/:token', AuthController.confirmEmail);

router.post(
  '/confirm/resend',
  validateBody(ResendConfirmationEmailSchema),
  AuthController.resendConfirmationEmail,
);

export default router;
