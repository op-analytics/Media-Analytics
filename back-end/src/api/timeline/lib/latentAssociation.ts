import * as math from 'mathjs';

import LatentAssociationData from '../interfaces/LatentAssociationData';
import LatentAssociationDocument from '../interfaces/LatentAssociationDocument';
import LatentAssociation from '../models/latentAssociation.model';

/**
 * Construct an object using the data's year range as the key
 * and the vectors as the values
 * @param concept - The concept to extract the vectors from
 * @returns A dictionary of year ranges and vectors
 */
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

/**
 * Get the concept data from the database for the given set of parameters
 * @param concept - The concept to get data for
 * @param outlet - The outlet to get the data for
 * @param yearFrom - The minimum year you want data for
 * @param yearTo - The maximum year you want data for
 * @returns The latent association data from the db
 */
async function getConceptData(
  concept: string[],
  outlet: string,
  yearFrom: number,
  yearTo: number,
): Promise<LatentAssociationDocument[]> {
  return LatentAssociation.find({
    word: { $in: concept },
    // Because the data is stored in five year chunks check from five years 
    //before the yearFrom to make sure you get all the data you wanted
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_from: { $gte: yearFrom - 5 },
    // eslint-disable-next-line @typescript-eslint/camelcase
    year_to: { $lte: yearTo },
    media_outlet: outlet,
  }).exec();
}

/**
 * Clean a concept by trimming and lowercasing all values
 * @param concept - The concept to clean
 * @returns The cleaned concept
 */
function CleanConcept(concept: string[]): string[] {
  return concept.map(word => word.trim().toLowerCase());
}

/**
 * Calculate the association between and shape two sets of concept data into
 * one list of association data
 * 
 * @param concept1Data - A set of concept to calculate the association between
 * @param concept2Data - A set of concept to calculate the association between
 * @param outlet - The outlet this data was for
 * @returns The shaped association data
 */
function ShapeData(
  concept1Data: LatentAssociationDocument[],
  concept2Data: LatentAssociationDocument[],
  outlet: string,
): LatentAssociationData[] {
  const latentAssociationData: LatentAssociationData[] = [];
  if (concept1Data.length > 0 && concept2Data.length > 0) {
    const concept1Vectors = extractVectors(concept1Data);
    const concept2Vectors = extractVectors(concept2Data);
    // Add both sets of year ranges to an array and filter for unique entries
    let yearRanges = [...new Set(Object.keys(concept1Vectors).concat(Object.keys(concept2Vectors)))]

    // Sort the year ranges as numbers not strings
    yearRanges.sort(x => x.split('-').map(Number)[0]);

    // For each year range
    yearRanges.forEach(yearRange => {
      // Take the vectors from concept 1
      const yearRangeVectors1 = concept1Vectors[yearRange];
      // and concept 1
      const yearRangeVectors2 = concept2Vectors[yearRange];
      // If they both exist
      if (yearRangeVectors1 && yearRangeVectors2) {
        // Calculate the association between them and create an entry for the year and outlet
        latentAssociationData.push({
          yearRange,
          association: calculateAssociation(
            yearRangeVectors1,
            yearRangeVectors2,
          ),
          outlet,
        });
      }
    });
  }
  return latentAssociationData;
}

/**
 * Get the latent association between two vectors
 * @param vector1 - The first vector to compare
 * @param vector2 - The second vector to compare
 * @returns The dot product of the average or two vectors along the zeroth axis
 */
function calculateAssociation(vector1: number[][], vector2: number[][]): number {
  return math.dot(math.mean(vector1, 0), math.mean(vector2, 0));
}

/**
 * Get the latent association data for a given set of parameters
 * @param concept1 - A list of words that represent a concept
 * @param concept2 - A list of words that represent a concept
 * @param outlet - An outlet to use in the query
 * @param yearFrom - The year to start your search from
 * @param yearTo - The year to end your search at
 * @returns The latent association data for the given parameters
 */
async function GetLatentAssociation(
  concept1: string[],
  concept2: string[],
  outlet: string,
  yearFrom: number,
  yearTo: number,
): Promise<LatentAssociationData[]> {
  const concept1Data = await getConceptData(concept1, outlet, yearFrom, yearTo);
  const concept2Data = await getConceptData(concept2, outlet, yearFrom, yearTo);
  return ShapeData(concept1Data, concept2Data, outlet);
}

export { GetLatentAssociation, CleanConcept };
