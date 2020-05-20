import math from 'mathjs';
import LatentAssociation from '../models/latentAssociation.model';
import { LatentAssociationData } from '../types';

// interface Vectors {}

// TODO: Fix these types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractVectors(concept: any): any {
  const vectorData: Record<string, number[][]> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  concept.forEach((data: Record<string, any>) => {
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
  // NOTE: This might be wrong ask Liam for confirmation
): Promise<LatentAssociationData[]> {
  return LatentAssociation.find({
    word: concept,
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_from: { $gte: yearFrom - 5 },
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_to: { $lte: yearTo },
  }).exec();
}

function CleanConcept(concept: string[]): string[] {
  return concept.map(word => word.trim().toLowerCase());
}

// TODO: Fix typing in this function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ShapeData(concept1Data: any, concept2Data: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latentAssociationData: { yearRange: string; association: any }[] = [];
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
  const concept1Data = getConceptData(concept1, yearFrom, yearTo);
  const concept2Data = getConceptData(concept2, yearFrom, yearTo);

  return ShapeData(concept1Data, concept2Data);
}

export { GetLatentAssociation, CleanConcept };
