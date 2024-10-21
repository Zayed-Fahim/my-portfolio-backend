"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_controller_1 = require("./email.controller");
const emailRouter = express_1.default.Router();
emailRouter.route("/send-test-mail").post(email_controller_1.sendTestMailController);
emailRouter.route("/send").post(email_controller_1.sendMailController);
exports.default = emailRouter;
