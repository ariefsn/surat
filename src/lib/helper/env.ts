import { IEnv } from '../models';

const Env = (): IEnv => ({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '4000', 10),
  defaultSender: {
    name: process.env.DEFAULT_SENDER_NAME || '',
    email: process.env.DEFAULT_SENDER_EMAIL || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  },
});

export default Env;
