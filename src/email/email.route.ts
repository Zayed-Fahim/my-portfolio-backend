import express from "express";
import { sendMailController, sendTestMailController } from "./email.controller";

const emailRouter = express.Router();

emailRouter.route("/send-test-mail").post(sendTestMailController);
emailRouter.route("/send").post(sendMailController);

export default emailRouter;
