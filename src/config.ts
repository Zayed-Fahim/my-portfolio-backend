import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export interface IConfig {
  port: number;
  mongoURL: string;
  smtpFrom: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smtpConfirmationSubject: string;
}

const config = (): IConfig => {
  const {
    MONGODB_USERNAME: mongodbUsername,
    MONGODB_PASSWORD: mongodbPassword,
    MONGODB_HOST: mongodbHost,
    MONGODB_DB_NAME: dbName,
    SMTP_FROM: smtpFrom,
    SMTP_HOST: smtpHost,
    SMTP_PORT: smtpPort,
    SMTP_USER: smtpUser,
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
    !smtpConfirmationSubject
  ) {
    throw new Error("SMTP configuration is required.");
  }

  return {
    port: parseInt(process.env.PORT || "3001", 10),
    mongoURL,
    smtpFrom,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    smtpConfirmationSubject,
  };
};

export default config();
