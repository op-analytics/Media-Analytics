import express from 'express';

import timeline from './timeline/timeline.router';
import auth from './auth/auth.router';
import { ensureLoggedIn } from './auth/middlewares';

const router = express.Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the NYT media analytics api' });
});

router.get('/validated', ensureLoggedIn, (_, res) => {
  res.json({
    message: 'You are validated!',
  });
});

router.use('/timeline', timeline);
router.use('/auth', auth);

export default router;
