import express from 'express';

import { ensureLoggedIn } from '../auth/middlewares';
import { validateBody } from '../middlewares';
import {
  FrequencyController,
  LatentAssociationController,
  MainController,
} from './controllers';
import { FrequencySchema, LatentAssociationSchema } from './schemas';

const router = express.Router();

router.get('/', MainController.home);

router.post(
  '/latent-association',
  [ensureLoggedIn, validateBody(LatentAssociationSchema)],
  LatentAssociationController.getData,
);

router.post(
  '/frequency',
  [ensureLoggedIn, validateBody(FrequencySchema)],
  FrequencyController.getData,
);

export default router;
