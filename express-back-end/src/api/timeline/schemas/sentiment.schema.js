const Joi = require('@hapi/joi');

module.exports = Joi.object({
  word: Joi.string().required(),
  year_from: Joi.number().required(),
  year_to: Joi.number()
    .min(Joi.ref('year_from'))
    .required(),
});
