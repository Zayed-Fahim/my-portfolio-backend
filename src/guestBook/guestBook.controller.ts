import { Request, Response } from "express";
import {
  addGuestMessageService,
  getGuestMessagesService,
} from "./guestBook.service";

const addGuestMessageController = async (req: Request, res: Response) => {
  try {
    const result = await addGuestMessageService({ ...req.body, ip: req?.ip });

    res.status(result?.statusCode).json({
      success: result?.success,
      message: result?.message,
      data: result?.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Ops! Something went wrong!. Try again.",
    });
  }
};

const getGuestMessagesController = async (req: Request, res: Response) => {
  try {
    const result = await getGuestMessagesService();
    res.status(result?.statusCode).json({
      success: result?.success,
      message: result?.message,
      data: result?.data ?? [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error on data retrieval.",
    });
  }
};

export { addGuestMessageController, getGuestMessagesController };
