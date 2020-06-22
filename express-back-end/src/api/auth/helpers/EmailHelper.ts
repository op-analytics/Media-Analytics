import jwt from 'jsonwebtoken';

import config from '@/config';
import transport from '@/email';

export default {
  /**
   * Send a validation email to a user
   *
   * @param email - Email of the user to be confirmed
   */
  sendConfirmationEmail(email: string): void {
    // Sign and encode the users email
    jwt.sign({email}, config.secret, { expiresIn: '1d' }, (_, emailToken) => {
      // Create a url with the signed and encoded email as a path parameter
      const confirmationUrl = `${config.baseURL}/api/auth/confirm/${emailToken}`;
      // Send the user an email with the conformation url as a link
      transport.sendMail({
        to: email,
        subject: 'Confirm email',
        html: `Please click this link to confirm your email: <a href="${confirmationUrl}">Confirm</a>`,
      });
    });
  },
};
