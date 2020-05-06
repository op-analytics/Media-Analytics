const LatentAssociation = require('../models/latentAssociation.model');
const { LatentAssociationSchema } = require('../schemas');
const math = require('mathjs');

const extractVectors = concept => {
  let vectorData = {};
  for (let data of concept) {
    const vectorDataKey = data.year_from + '-' + data.year_to;
    if (!vectorData[vectorDataKey]) {
      vectorData[vectorDataKey] = [data.vectors];
    } else {
      vectorData[vectorDataKey].push(data.vectors);
    }
  }
  return vectorData;
};

const GetLatentAssociation = async (req, res) => {
  const { error, value } = LatentAssociationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    res.status(422).json({
      errors: error.details.map(error => ({
        value: error.path,
        message: error.message,
      })),
    });
    return;
  }
  const concept1Data = await LatentAssociation.find({
    word: value.concept_1,
    year_from: { $gte: value.year_from - 5 },
    year_to: { $lte: value.year_to },
  });

  const concept2Data = await LatentAssociation.find({
    word: value.concept_2,
    year_from: { $gte: value.year_from - 5 },
    year_to: { $lte: value.year_to },
  });

  if (concept1Data.length > 0 && concept2Data.length > 0) {
    latentAssociationData = [];
    concept1Vectors = extractVectors(concept1Data);
    concept2Vectors = extractVectors(concept2Data);
    let yearRanges = [];
    if (
      Object.keys(concept1Vectors).length > Object.keys(concept2Vectors).length
    ) {
      yearRanges = Object.keys(concept1Vectors);
    } else {
      yearRanges = Object.keys(concept2Vectors);
    }
    yearRanges.sort(x => x.split('-')[0]);

    for (let yearRange of yearRanges) {
      yearRangeVectors1 = concept1Vectors[yearRange];
      yearRangeVectors2 = concept2Vectors[yearRange];
      if (yearRangeVectors1 && yearRangeVectors2) {
        latentAssociationData.push({
          yearRange: yearRange,
          association: math.dot(
            math.mean(yearRangeVectors1, 0),
            math.mean(yearRangeVectors2, 0),
          ),
        });
      }
    }
    res.json({ data: latentAssociationData });
    return;
  }
  res.status(404).json({
    error: 'No latent association data was found for given parameters',
  });
};

module.exports = {
  GetLatentAssociation,
};
