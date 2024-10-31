import express from "express";
import {
  addGuestMessageController,
  getGuestMessagesController,
} from "./guestBook.controller";

const guestBookRouteGet = express.Router();

guestBookRouteGet.route("/").get(getGuestMessagesController);

export const guestBookRoutePost = addGuestMessageController;
export default guestBookRouteGet;
