import { object, string } from '@hapi/joi';

export default object({
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .required(),
});
