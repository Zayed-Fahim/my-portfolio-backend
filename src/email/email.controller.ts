import { Request, Response } from "express";
import { sendTestMailService, sendMailService } from "./email.service";

const sendTestMailController = async (req: Request, res: Response) => {
  try {
    await sendTestMailService(req.body);
    res
      .status(200)
      .json({ success: true, message: "Test email sent successfully." });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to send test email.",
      error: error.message,
    });
  }
};

const sendMailController = async (req: Request, res: Response) => {
  try {
    await sendMailService(req.body);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to send email.",
      error: error.message,
    });
  }
};

export { sendTestMailController, sendMailController };
