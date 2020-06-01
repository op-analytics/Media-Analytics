import express from 'express';

import auth from './auth/auth.router';
import { ensureLoggedIn } from './auth/middlewares';
import timeline from './timeline/timeline.router';

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
