"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTestMailService = exports.sendMailService = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const renderEjsTemplate_1 = require("../utils/renderEjsTemplate");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const receiverTemplatePath = path_1.default.join(__dirname, "templates", "contactEmail.ejs");
const senderTemplatePath = path_1.default.join(__dirname, "templates", "emailConfirmation.ejs");
const sendTestMailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverMessageOptions = {
            to: {
                name: "Zayed Fahim",
                address: config_1.default.smtpFrom,
            },
            subject: data.subject,
            replyTo: {
                name: data.fullName,
                address: data.email,
            },
            html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
        };
        const receiverResponse = yield (0, sendEmail_1.default)(receiverMessageOptions);
        if (receiverResponse.accepted.length > 0) {
            const senderMessageOptions = {
                from: {
                    name: "Zayed Fahim",
                    address: config_1.default.smtpFrom,
                },
                to: {
                    name: data.fullName,
                    address: data.email,
                },
                subject: config_1.default.smtpConfirmationSubject,
                html: `       
          <p>Dear ${data.fullName},</p>
          <p>Thank you for your message! I have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Zayed Fahim</p>
        `,
            };
            yield (0, sendEmail_1.default)(senderMessageOptions);
            return {
                statusCode: 200,
                success: true,
                message: "Emails sent successfully.",
            };
        }
        throw new Error("Failed to send test email.");
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: `Email service error: ${error.message}`,
        };
    }
});
exports.sendTestMailService = sendTestMailService;
const sendMailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverTemplate = yield (0, renderEjsTemplate_1.renderEjsTemplate)(receiverTemplatePath, Object.assign({}, data));
        const senderTemplate = yield (0, renderEjsTemplate_1.renderEjsTemplate)(senderTemplatePath, Object.assign({}, data));
        const receiverMessageOptions = {
            from: {
                name: data.fullName,
                address: data.email,
            },
            to: {
                name: "Zayed Fahim",
                address: config_1.default.smtpFrom,
            },
            replyTo: {
                name: data.fullName,
                address: data.email,
            },
            subject: data.subject,
            html: receiverTemplate,
        };
        const response = yield (0, sendEmail_1.default)(receiverMessageOptions);
        if (response.accepted.length > 0) {
            const senderMessageOptions = {
                from: {
                    name: "Zayed Fahim",
                    address: config_1.default.smtpFrom,
                },
                to: {
                    name: data.fullName,
                    address: data.email,
                },
                replyTo: {
                    name: "Zayed Fahim",
                    address: config_1.default.smtpFrom,
                },
                subject: config_1.default.smtpConfirmationSubject,
                html: senderTemplate,
            };
            yield (0, sendEmail_1.default)(senderMessageOptions);
            return {
                statusCode: 200,
                success: true,
                message: "Email sent successfully.",
                data: [],
            };
        }
        else {
            return {
                statusCode: 500,
                success: false,
                message: "Failed to send email.",
            };
        }
    }
    catch (error) {
        throw new Error("Failed to send email.");
    }
});
exports.sendMailService = sendMailService;
