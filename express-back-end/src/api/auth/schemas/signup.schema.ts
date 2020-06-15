import Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .min(8),
  confirmPassword: Joi.valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm Password must match Password',
      'any.required': 'Confirm Password is required',
    }),
});
