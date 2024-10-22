import { Request, Response } from "express";
import { sendTestMailService, sendMailService } from "./email.service";

const sendTestMailController = async (req: Request, res: Response) => {
  try {
    const response = await sendTestMailService(req.body);
    res
      .status(response.statusCode)
      .json({ success: response.success, message: response.message });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to send test email.",
    });
  }
};

const sendMailController = async (req: Request, res: Response) => {
  try {
    const response = await sendMailService(req.body);
    res
      .status(response.statusCode)
      .json({ success: response.success, message: response.message });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
};

export { sendTestMailController, sendMailController };
