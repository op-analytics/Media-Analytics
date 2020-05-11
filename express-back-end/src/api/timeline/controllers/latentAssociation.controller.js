const LatentAssociation = require('../models/latentAssociation.model');
const math = require('mathjs');

function extractVectors(concept) {
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
}

async function getConceptData(concept, yearFrom, yearTo) {
  return LatentAssociation.find({
    word: concept,
    year_from: { $gte: yearFrom - 5 },
    year_to: { $lte: yearTo },
  }).exec();
}

function CleanConcept(concept) {
  return concept.map(word => word.trim().toLowerCase());
}

function ShapeData(concept1Data, concept2Data) {
  latentAssociationData = [];
  if (concept1Data.length > 0 && concept2Data.length > 0) {
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
  }
  return latentAssociationData;
}

async function GetLatentAssociation(concept1, concept2, yearFrom, yearTo) {
  const concept1Data = getConceptData(concept1, yearFrom, yearTo);
  const concept2Data = getConceptData(concept2, yearFrom, yearTo);

  return ShapeData(concept1Data, concept2Data);
}

module.exports = {
  GetLatentAssociation,
  CleanConcept,
};
