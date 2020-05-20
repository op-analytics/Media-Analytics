import Joi from '@hapi/joi';
import { Request } from 'express';

export interface LatentAssociationRequest extends Request {
  body: {
    // eslint-disable-next-line
    concept_1: string[];
    // eslint-disable-next-line
    concept_2: string[];
    // eslint-disable-next-line
    year_from: number;
    // eslint-disable-next-line
    year_to: number;
  };
}

export default Joi.object({
  // eslint-disable-next-line @typescript-eslint/camelcase
  concept_1: Joi.array()
    .items(Joi.string())
    .required()
    .min(1),
  // eslint-disable-next-line @typescript-eslint/camelcase
  concept_2: Joi.array()
    .items(Joi.string())
    .required()
    .min(1),
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_from: Joi.number().required(),
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_to: Joi.number()
    .min(Joi.ref('year_from'))
    .required(),
});
