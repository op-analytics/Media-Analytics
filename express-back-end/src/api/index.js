const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the NYT media analytics api' });
});

module.exports = router;
