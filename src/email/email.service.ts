import path from "path";
import config from "../config";
import { renderEjsTemplate } from "../utils/renderEjsTemplate";
import sendEmail from "../utils/sendEmail";
import { IEmailProps } from "./email.interface";

const receiverTemplatePath = path.join(
  __dirname,
  "templates",
  "contactEmail.ejs"
);
const senderTemplatePath = path.join(
  __dirname,
  "templates",
  "emailConfirmation.ejs"
);

const sendTestMailService = async (data: IEmailProps) => {
  try {
    const receiverMessageOptions = {
      to: {
        name: "Zayed Fahim",
        address: config.smtpFrom,
      },
      subject: data.subject,
      replyTo: {
        name: data.fullName,
        address: data.email,
      },
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    };

    const receiverResponse = await sendEmail(receiverMessageOptions);

    if (receiverResponse.accepted.length > 0) {
      const senderMessageOptions = {
        from: {
          name: "Zayed Fahim",
          address: config.smtpFrom,
        },
        to: {
          name: data.fullName,
          address: data.email,
        },
        subject: config.smtpConfirmationSubject,
        html: `       
          <p>Dear ${data.fullName},</p>
          <p>Thank you for your message! I have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Zayed Fahim</p>
        `,
      };

      await sendEmail(senderMessageOptions);

      return {
        statusCode: 200,
        success: true,
        message: "Emails sent successfully.",
      };
    }

    throw new Error("Failed to send test email.");
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      message: `Email service error: ${error.message}`,
    };
  }
};

const sendMailService = async (data: IEmailProps) => {
  try {
    const receiverTemplate = await renderEjsTemplate(receiverTemplatePath, {
      ...data,
    });
    const senderTemplate = await renderEjsTemplate(senderTemplatePath, {
      ...data,
    });

    const receiverMessageOptions = {
      from: {
        name: data.fullName,
        address: data.email,
      },
      to: {
        name: "Zayed Fahim",
        address: config.smtpFrom,
      },
      replyTo: {
        name: data.fullName,
        address: data.email,
      },
      subject: data.subject,
      html: receiverTemplate,
    };

    const response = await sendEmail(receiverMessageOptions);

    if (response.accepted.length > 0) {
      const senderMessageOptions = {
        from: {
          name: "Zayed Fahim",
          address: config.smtpFrom,
        },
        to: {
          name: data.fullName,
          address: data.email,
        },
        replyTo: {
          name: "Zayed Fahim",
          address: config.smtpFrom,
        },
        subject: config.smtpConfirmationSubject,
        html: senderTemplate,
      };

      await sendEmail(senderMessageOptions);
      return {
        statusCode: 200,
        success: true,
        message: "Email sent successfully.",
      };
    } else {
      return {
        statusCode: 500,
        success: false,
        message: "Failed to send email.",
      };
    }
  } catch (error: any) {
    throw new Error("Failed to send email.");
  }
};

export { sendMailService, sendTestMailService };
