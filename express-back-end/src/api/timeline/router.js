const express = require('express');
const router = express.Router();
const FrequencyController = require('./controllers/frequency.controller');

router.get('/', (_, res) => {
  res.json({ message: 'You reached timeline' });
});

router.post('/frequency', FrequencyController.GetFrequency);

module.exports = router;
