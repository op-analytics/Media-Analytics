const express = require('express');

const router = express.Router();
const LatentAssociationController = require('./controllers/latentAssociation.controller');
const FrequencyController = require('./controllers/frequency.controller');
const MainController = require('./controllers/main.controller');
const { ensureLoggedIn } = require('../auth/middlewares');
const { validateBody } = require('../middlewares/');
const { FrequencySchema, LatentAssociationSchema } = require('./schemas');

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

module.exports = router;
