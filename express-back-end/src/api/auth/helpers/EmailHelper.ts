import jwt from 'jsonwebtoken';

import config from '@/config';
import transport from '@/email';

export default {
  sendConfirmationEmail(email: string): void {
    jwt.sign({email}, config.secret, { expiresIn: '1d' }, (_, emailToken) => {
      // TODO: Change to a redirect url in .env
      const confirmationUrl = `${config.baseURL}/api/auth/confirm/${emailToken}`;
      transport.sendMail({
        to: email,
        subject: 'Confirm email',
        html: `Please click this link to confirm your email: <a href="${confirmationUrl}">Confirm</a>`,
      });
    });
  },
};
