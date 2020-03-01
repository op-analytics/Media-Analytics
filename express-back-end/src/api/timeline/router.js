const express = require('express');
const router = express.Router();
const LatentAssociationController = require('./controllers/latentAssociation.controller');
const FrequencyController = require('./controllers/frequency.controller');

router.get('/', (_, res) => {
  res.json({ message: 'You reached timeline' });
});

router.post(
  '/latent-association',
  LatentAssociationController.GetLatentAssociation,
);

router.post('/frequency', FrequencyController.GetFrequency);

module.exports = router;
