const express = require('express');

const router = express.Router();
const {
  LatentAssociationController,
  FrequencyController,
  MainController,
} = require('./controllers/');
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
