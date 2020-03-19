const express = require('express');
const router = express.Router();
const timeline = require('./timeline/timeline.router');
const auth = require('./auth/auth.router');
const { ensureLoggedIn } = require('./auth/middlewares');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the NYT media analytics api' });
});

router.get('/validated', ensureLoggedIn, (req, res) => {
  res.json({
    message: 'You are validated!',
  });
});

router.use('/timeline', timeline);
router.use('/auth', auth);

module.exports = router;
