import Joi from '@hapi/joi';
import { Request } from 'express';

export interface FrequencyRequest extends Request {
  body: {
    words: string[];
    // eslint-disable-next-line
    year_from: number;
    // eslint-disable-next-line
    year_to: number;
  };
}

export default Joi.object({
  words: Joi.array()
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
