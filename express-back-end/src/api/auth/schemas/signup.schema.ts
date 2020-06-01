import { object, ref, string, valid } from '@hapi/joi';

export default object({
  name: string().required(),
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(8),
  confirmPassword: valid(ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm Password must match Password',
      'any.required': 'Confirm Password is required',
    }),
});
