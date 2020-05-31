import math from 'mathjs';

import LatentAssociationData from '../interfaces/LatentAssociationData';
import LatentAssociationDocument from '../interfaces/LatentAssociationDocument';
import LatentAssociation from '../models/latentAssociation.model';

function extractVectors(
  concept: LatentAssociationDocument[],
): Record<string, number[][]> {
  const vectorData: Record<string, number[][]> = {};
  concept.forEach((data: LatentAssociationDocument) => {
    const vectorDataKey = `${data.year_from}-${data.year_to}`;
    if (!vectorData[vectorDataKey]) {
      vectorData[vectorDataKey] = [data.vectors];
    } else {
      vectorData[vectorDataKey].push(data.vectors);
    }
  });
  return vectorData;
}

async function getConceptData(
  concept: string[],
  yearFrom: number,
  yearTo: number,
): Promise<LatentAssociationDocument[]> {
  return LatentAssociation.find({
    word: { $in: concept },
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_from: { $gte: yearFrom - 5 },
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_to: { $lte: yearTo },
  }).exec();
}

function CleanConcept(concept: string[]): string[] {
  return concept.map(word => word.trim().toLowerCase());
}

function ShapeData(
  concept1Data: LatentAssociationDocument[],
  concept2Data: LatentAssociationDocument[],
): LatentAssociationData[] {
  const latentAssociationData: LatentAssociationData[] = [];
  if (concept1Data.length > 0 && concept2Data.length > 0) {
    const concept1Vectors = extractVectors(concept1Data);
    const concept2Vectors = extractVectors(concept2Data);
    let yearRanges = [];
    if (
      Object.keys(concept1Vectors).length > Object.keys(concept2Vectors).length
    ) {
      yearRanges = Object.keys(concept1Vectors);
    } else {
      yearRanges = Object.keys(concept2Vectors);
    }
    yearRanges.sort(x => x.split('-').map(Number)[0]);

    yearRanges.forEach(yearRange => {
      const yearRangeVectors1 = concept1Vectors[yearRange];
      const yearRangeVectors2 = concept2Vectors[yearRange];
      if (yearRangeVectors1 && yearRangeVectors2) {
        latentAssociationData.push({
          yearRange,
          association: math.dot(
            math.mean(yearRangeVectors1, 0),
            math.mean(yearRangeVectors2, 0),
          ),
        });
      }
    });
  }
  return latentAssociationData;
}

async function GetLatentAssociation(
  concept1: string[],
  concept2: string[],
  yearFrom: number,
  yearTo: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const concept1Data = await getConceptData(concept1, yearFrom, yearTo);
  const concept2Data = await getConceptData(concept2, yearFrom, yearTo);

  return ShapeData(concept1Data, concept2Data);
}

export { GetLatentAssociation, CleanConcept };
