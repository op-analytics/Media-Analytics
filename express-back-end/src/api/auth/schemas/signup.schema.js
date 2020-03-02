const Joi = require('@hapi/joi');
module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.valid(Joi.ref('password')),
});
