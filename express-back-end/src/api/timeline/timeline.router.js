const express = require('express');

const router = express.Router();
const {
  LatentAssociationController,
  FrequencyController,
  SentimentController,
  MainController,
} = require('./controllers/');
const { ensureLoggedIn } = require('../auth/middlewares');
const { validateBody } = require('../middlewares/');
const {
  FrequencySchema,
  LatentAssociationSchema,
  SentimentSchema,
} = require('./schemas');

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

router.post(
  '/sentiment',
  [ensureLoggedIn, validateBody(SentimentSchema)],
  SentimentController.getData,
);

module.exports = router;
