import { Request, Response } from "express";
import { sendTestMailService, sendMailService } from "./email.service";
import { IEmailProps } from "./email.interface";

const sendTestMailController = async (req: Request, res: Response) => {
  try {
    const response = await sendTestMailService(req.body as IEmailProps);
    res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to send test email: ${error.message}`,
    });
  }
};

const sendMailController = async (req: Request, res: Response) => {
  try {
    const response = await sendMailService(req.body as IEmailProps);
    res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to send email: ${error.message}`,
    });
  }
};

export { sendTestMailController, sendMailController };
