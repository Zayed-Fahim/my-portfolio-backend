import express from "express";
import { sendMailController, sendTestMailController } from "./email.controller";

const emailRouter = express.Router();

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
emailRouter.route("/send").post(sendMailController);

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
emailRouter.route("/send-test-mail").post(sendTestMailController);

export default emailRouter;
