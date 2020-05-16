const LatentAssociation = require('../lib/latentAssociation');

exports.getData = async (req, res) => {
  const {
    concept_1: dirtyConcept1,
    concept_2: dirtyConcept2,
    year_from: yearFrom,
    year_to: yearTo,
  } = req.body;
  const concept1 = LatentAssociation.CleanConcept(dirtyConcept1);
  const concept2 = LatentAssociation.CleanConcept(dirtyConcept2);
  const latentAssociationData = await LatentAssociation.GetLatentAssociation(
    concept1,
    concept2,
    yearFrom,
    yearTo,
  );
  if (latentAssociationData.length > 0)
    return res.json({ data: latentAssociationData });

  return res.status(404).json({
    error: 'No latent association data was found for given parameters',
  });
};
