import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import config from '@/config';

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

const transport = nodemailer.createTransport(transportOptions);
transport.verify();
