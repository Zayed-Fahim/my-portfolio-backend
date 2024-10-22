"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_controller_1 = require("./email.controller");
const emailRouter = express_1.default.Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     EmailSchema:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of the sender.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the sender.
 *         subject:
 *           type: string
 *           description: The subject of the email.
 *         message:
 *           type: string
 *           description: The message content of the email.
 *       required:
 *         - fullName
 *         - email
 *         - subject
 *         - message
 */
/**
 * @openapi
 * /api/v2/email/send:
 *   post:
 *     tags:
 *       - Email
 *     summary: Send an email
 *     description: Sends an email using the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailSchema'
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       500:
 *         description: Failed to send email.
 */
emailRouter.route("/send").post(email_controller_1.sendMailController);
/**
 * @openapi
 * /api/v2/email/send-test-mail:
 *   post:
 *     tags:
 *       - Email
 *     summary: Send a test email
 *     description: Sends a test email using Nodemailer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailSchema'
 *     responses:
 *       200:
 *         description: Test email sent successfully.
 *       500:
 *         description: Failed to send test email.
 */
emailRouter.route("/send-test-mail").post(email_controller_1.sendTestMailController);
exports.default = emailRouter;
