import nodemailer, { TransportOptions } from "nodemailer";
import config from "../config";

const createTransporter = async () => {
  try {
    return nodemailer.createTransport({
      service: "gmail",
      host: config.smtpHost,
      port: Number(config.smtpPort),
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    } as TransportOptions);
  } catch (error) {
    throw new Error(`Failed to create email transporter: ${error}`);
  }
};

const sendEmail = async (mailOptions: any) => {
  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default sendEmail;
