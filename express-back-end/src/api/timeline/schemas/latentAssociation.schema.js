const Joi = require('@hapi/joi');

module.exports = Joi.object({
  concept_1: Joi.array()
    .items(Joi.string())
    .required()
    .min(1),
  concept_2: Joi.array()
    .items(Joi.string())
    .required()
    .min(1),
  year_from: Joi.number().required(),
  year_to: Joi.number()
    .min(Joi.ref('year_from'))
    .required(),
});
