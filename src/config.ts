import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// MongoDB Configuration Interface
export interface IMongoConfig {
  mongodbUsername: string;
  mongodbPassword: string;
  mongodbHost: string;
  dbName: string;
}

// Function to get MongoDB configuration
const getMongoConfig = (): IMongoConfig => {
  if (
    !process.env.MONGODB_USERNAME ||
    !process.env.MONGODB_PASSWORD ||
    !process.env.MONGODB_HOST ||
    !process.env.MONGODB_DB_NAME
  ) {
    throw new Error("Missing MongoDB configuration in environment variables.");
  }

  return {
    mongodbUsername: process.env.MONGODB_USERNAME,
    mongodbPassword: process.env.MONGODB_PASSWORD,
    mongodbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_DB_NAME,
  };
};

// General App Configuration Interface
export interface IConfig {
  port: number;
  mongoURL: string;
  smtpFrom: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
}

// Function to get the app configuration
const config = (): IConfig => {
  const mongoConfig = getMongoConfig();
  const { mongodbUsername, mongodbPassword, mongodbHost, dbName } = mongoConfig;

  const {
    SMTP_FROM: smtpFrom,
    SMTP_HOST: smtpHost,
    SMTP_PORT: smtpPort,
    SMTP_USER: smtpUser,
    SMTP_PASS: smtpPass,
  } = process.env;

  // Build MongoDB connection string
  const mongoURL = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbHost}/${dbName}`;

  if (!smtpFrom || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
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
  };
};

export default config();
