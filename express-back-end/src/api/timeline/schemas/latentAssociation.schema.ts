import Joi from '@hapi/joi';

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
