import Joi from '@hapi/joi';

export default Joi.object({
  word: Joi.string().required(),
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_from: Joi.number().required(),
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_to: Joi.number()
    .min(Joi.ref('year_from'))
    .required(),
});
