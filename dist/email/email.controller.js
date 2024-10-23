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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailController = exports.sendTestMailController = void 0;
const email_service_1 = require("./email.service");
const sendTestMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, email_service_1.sendTestMailService)(req.body);
        res.status(response.statusCode).json({
            success: response.success,
            message: response.message,
            data: response.data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to send test email: ${error.message}`,
        });
    }
});
exports.sendTestMailController = sendTestMailController;
const sendMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, email_service_1.sendMailService)(req.body);
        res
            .status(response.statusCode)
            .json({
            success: response.success,
            message: response.message,
            data: response.data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to send email: ${error.message}`,
        });
    }
});
exports.sendMailController = sendMailController;
