import mongoose from "mongoose";
import { addGuestUserController } from "../user/user.controller";
import GuestBook from "./guestBook.model";
import { InitialGuestBookProps } from "./guestBook.interface";
import { InitialUserProps } from "src/user/user.interface";

const addGuestMessageService = async (data: InitialGuestBookProps) => {
  const userInfo: InitialUserProps = { ...data.user, ip: data.ip };
  const userResponse = await addGuestUserController(userInfo);

  if (userResponse?.id && mongoose.Types.ObjectId.isValid(userResponse.id)) {
    const newMessageData = { content: data.message, user: userResponse.id };
    const result = await GuestBook.create(newMessageData);

    return {
      statusCode: 201,
      success: true,
      message: "Guest message added successfully!",
      data: result,
    };
  }

  return {
    statusCode: 400,
    success: false,
    message: "Failed to add guest message - invalid user ID.",
    data: null,
  };
};

const getGuestMessagesService = async () => {
  const result = await GuestBook.find({})
    .populate({
      path: "user",
      select: "-ip -email -__v -createdAt -updatedAt -_id",
    })
    .select("-__v -updatedAt -_id");

  return {
    statusCode: 200,
    success: true,
    message: "Data retrieved successfully!",
    data: result ?? [],
  };
};

export { addGuestMessageService, getGuestMessagesService };
