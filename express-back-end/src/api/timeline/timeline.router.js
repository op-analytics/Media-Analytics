const express = require('express');
const router = express.Router();
const LatentAssociationController = require('./controllers/latentAssociation.controller');
const FrequencyController = require('./controllers/frequency.controller');
const { ensureLoggedIn } = require('../auth/middlewares');
const { validateBody } = require('../middlewares/validation');
const { FrequencySchema, LatentAssociationSchema } = require('../schemas');

router.get('/', (_, res) => {
  res.json({ message: 'You reached timeline' });
});

router.post(
  '/latent-association',
  [ensureLoggedIn, validateBody(LatentAssociationSchema)],
  async (req, res) => {
    const {
      concept_1: concept1,
      concept_2: concept2,
      year_from: yearFrom,
      year_to: yearTo,
    } = req;
    concept1 = LatentAssociationController.CleanConcept(concept1);
    concept2 = LatentAssociationController.CleanConcept(concept2);
    const latentAssociationData = await LatentAssociationController.GetLatentAssociation(
      concept1,
      concept2,
      yearFrom,
      yearTo,
    );
    if (latentAssociationData.length > 0)
      return res.json({ data: latentAssociationData });

    res.status(404).json({
      error: 'No latent association data was found for given parameters',
    });
  },
);

router.post(
  '/frequency',
  [ensureLoggedIn, validateBody(FrequencySchema)],
  async (req, res) => {
    const { words, year_from: yearFrom, year_to: yearTo } = req;
    words = req.words.map(word => word.trim().toLowerCase());

    const frequencyData = await FrequencyController.GetFrequency(
      words,
      yearFrom,
      yearTo,
    );
    if (frequencyData.length > 0) return res.json({ data: frequencyData });
    res.status(404).json({
      error: 'No frequency data was found for given parameters',
    });
  },
);

module.exports = router;
