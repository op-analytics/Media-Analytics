const express = require('express');
const router = express.Router();
const LatentAssociationController = require('./controllers/latentAssociation.controller');
const FrequencyController = require('./controllers/frequency.controller');
const { ensureLoggedIn } = require('../auth/middlewares');

router.get('/', (_, res) => {
  res.json({ message: 'You reached timeline' });
});

router.post(
  '/latent-association',
  ensureLoggedIn,
  LatentAssociationController.GetLatentAssociation,
);

router.post('/frequency', ensureLoggedIn, FrequencyController.GetFrequency);

module.exports = router;
