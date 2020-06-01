import Joi from '@hapi/joi';

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
  media_outlets: Joi.array()
    .items(Joi.string())
    .required()
    .min(1)
});
