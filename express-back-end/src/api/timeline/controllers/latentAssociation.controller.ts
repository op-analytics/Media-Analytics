import { Request, Response } from 'express';
import { CleanConcept, GetLatentAssociation } from '../lib/latentAssociation';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getData(req: Request, res: Response) {
  const {
    concept_1: dirtyConcept1,
    concept_2: dirtyConcept2,
    year_from: yearFrom,
    year_to: yearTo,
  } = req.body;
  const concept1 = CleanConcept(dirtyConcept1);
  const concept2 = CleanConcept(dirtyConcept2);
  const latentAssociationData = await GetLatentAssociation(
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
}
