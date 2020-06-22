import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import config from '@/config';

// Email transport options using the gmail oauth settings in the config
const transportOptions: SMTPTransport.Options = {
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAUTH2',
    user: config.gmail.email,
    clientId: config.gmail.clientId,
    clientSecret: config.gmail.clientSecret,
    refreshToken: config.gmail.refreshToken,
  },
};

// Create an email transport using the options from above
const transport = nodemailer.createTransport(transportOptions);

// Verify that the transport is valid
transport.verify();

export default transport;
