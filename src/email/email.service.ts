import { IEmailProps } from "./email.interface";
import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: true,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

const sendTestMailService = async (data: IEmailProps) => {
  try {
    await transporter.sendMail({
      from: config.smtpFrom,
      to: data?.email,
      subject: data?.subject,
      html: `<h3>Hi, ${data?.fullName}</h3>`,
    });
  } catch (error: any) {
    console.error("Failed to send test email:", error.message);
    throw new Error("Failed to send test email.");
  }
};

const sendMailService = async (data: IEmailProps) => {
  try {
    await transporter.sendMail({
      from: config.smtpFrom,
      to: data?.email,
      subject: data.subject || "No Subject",
      html: "<p>This is a test email.</p>",
    });
    console.log(`Email sent to ${data?.email}`);
  } catch (error: any) {
    console.error("Failed to send email:", error.message);
    throw new Error("Failed to send email.");
  }
};

export { sendTestMailService, sendMailService };
