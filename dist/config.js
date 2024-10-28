"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../.env") });
const config = () => {
    const { MONGODB_USERNAME: mongodbUsername, MONGODB_PASSWORD: mongodbPassword, MONGODB_HOST: mongodbHost, MONGODB_DB_NAME: dbName, SMTP_FROM: smtpFrom, SMTP_HOST: smtpHost, SMTP_PORT: smtpPort, SMTP_USER: smtpUser, SMTP_PASS: smtpPass, SMTP_CONFIRMATION_SUBJECT: smtpConfirmationSubject, } = process.env;
    const mongoURL = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbHost}/${dbName}`;
    if (!process.env.MONGODB_USERNAME ||
        !process.env.MONGODB_PASSWORD ||
        !process.env.MONGODB_HOST ||
        !process.env.MONGODB_DB_NAME) {
        throw new Error("Missing MongoDB configuration in environment variables.");
    }
    if (!smtpFrom ||
        !smtpHost ||
        !smtpPort ||
        !smtpUser ||
        !smtpPass ||
        !smtpConfirmationSubject) {
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
exports.default = config();
