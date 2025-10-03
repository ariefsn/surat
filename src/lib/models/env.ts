export interface IEnvEmailAccount {
  name?: string;
  email: string;
}

export interface ISmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  pool: boolean;
  maxConnections: number;
  maxMessages: number;
}

export interface IEnv {
  host: string;
  port: number;
  defaultSender: IEnvEmailAccount;
  smtp: ISmtpConfig;
}
