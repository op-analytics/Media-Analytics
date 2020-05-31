import { Router } from 'express';

import { validateBody } from '../middlewares';
import { AuthController } from './controllers';
import { ensureLoggedIn } from './middlewares';
import { LoginSchema, SignupSchema } from './schemas';

const router = Router();

router.get('/', AuthController.home);

router.post('/signup', validateBody(SignupSchema), AuthController.signup);

router.post('/login', validateBody(LoginSchema), AuthController.login);

router.get('/user', ensureLoggedIn, AuthController.getUser);

export default router;
