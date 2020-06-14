import { object, string } from '@hapi/joi';

export default object({
  email: string()
    .email()
    .required(),
});
