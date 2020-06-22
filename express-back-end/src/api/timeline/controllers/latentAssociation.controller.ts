import { Response } from 'express';

import TokenHelper from '@/api/auth/helpers/TokenHelper';
import UserRequest from '@/api/auth/interfaces/UserRequest';

import { CleanConcept, GetLatentAssociation } from '../lib/latentAssociation';

/**
 * Get latent association data
 * @param req - Express' request object with a user
 * @param res - Express' response object
 */
export async function getData(req: UserRequest, res: Response): Promise<void> {
  const {
    concept_1: dirtyConcept1,
    concept_2: dirtyConcept2,
    outlet,
    year_from: yearFrom,
    year_to: yearTo,
  } = req.body;
  // Clean the given concepts
  const concept1 = CleanConcept(dirtyConcept1);
  const concept2 = CleanConcept(dirtyConcept2);

  // Get the latent association data for the given parameters
  const latentAssociationData = await GetLatentAssociation(
    concept1,
    concept2,
    outlet,
    yearFrom,
    yearTo,
  );

  // If we found data use a users token and respond with the data
  if (latentAssociationData.length > 0) {
    TokenHelper.useToken(req.user!!);
    res.json({ data: latentAssociationData });
    return;
  }

  // If we found no data let the user know
  res.status(404).json({
    error: 'No latent association data was found for given parameters',
  });
}
