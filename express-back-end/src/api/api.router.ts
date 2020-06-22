import express from 'express';

import auth from './auth/auth.router';
import timeline from './timeline/timeline.router';

const router = express.Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the NYT media analytics api' });
});

router.use('/timeline', timeline);
router.use('/auth', auth);

export default router;