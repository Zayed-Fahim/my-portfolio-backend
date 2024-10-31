import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export interface IConfig {
  nodeEnvironment: string | undefined;
  allowlistIpsProduction: string | undefined;
  allowlistIpDevelopment: string | undefined;
  port: number | undefined;
  mongoURL: string | undefined;
  smtpFrom: string | undefined;
  smtpHost: string | undefined;
  smtpPort: string | undefined;
  smtpUser: string | undefined;
  smtpUsername: string | undefined;
  smtpPass: string | undefined;
  smtpConfirmationSubject: string | undefined;
}

const config = (): IConfig => {
  const {
    NODE_ENV: nodeEnvironment,
    ALLOWLIST_IPS_PRODUCTION: allowlistIpsProduction,
    ALLOWLIST_IP_DEVELOPMENT: allowlistIpDevelopment,
    MONGODB_USERNAME: mongodbUsername,
    MONGODB_PASSWORD: mongodbPassword,
    MONGODB_HOST: mongodbHost,
    MONGODB_DB_NAME: dbName,
    SMTP_FROM: smtpFrom,
    SMTP_HOST: smtpHost,
    SMTP_PORT: smtpPort,
    SMTP_USER: smtpUser,
    SMTP_USERNAME: smtpUsername,
    SMTP_PASS: smtpPass,
    SMTP_CONFIRMATION_SUBJECT: smtpConfirmationSubject,
  } = process.env;

  const mongoURL = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbHost}/${dbName}`;
  if (
    !process.env.MONGODB_USERNAME ||
    !process.env.MONGODB_PASSWORD ||
    !process.env.MONGODB_HOST ||
    !process.env.MONGODB_DB_NAME
  ) {
    throw new Error("Missing MongoDB configuration in environment variables.");
  }

  if (
    !smtpFrom ||
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPass ||
    !smtpUsername ||
    !smtpConfirmationSubject
  ) {
    throw new Error("SMTP configuration is required.");
  }

  return {
    nodeEnvironment,
    port: parseInt(process.env.PORT || "3001", 10),
    allowlistIpsProduction,
    allowlistIpDevelopment,
    mongoURL,
    smtpFrom,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpUsername,
    smtpPass,
    smtpConfirmationSubject,
  };
};

export default config();
