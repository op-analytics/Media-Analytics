const express = require('express');
const router = express.Router();
const timeline = require('./timeline/router');
const auth = require('./auth/router');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the NYT media analytics api' });
});

router.use('/timeline', timeline);
router.use('/auth', auth);

module.exports = router;
