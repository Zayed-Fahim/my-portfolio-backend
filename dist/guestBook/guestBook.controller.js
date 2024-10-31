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
exports.getGuestMessagesController = exports.addGuestMessageController = void 0;
const guestBook_service_1 = require("./guestBook.service");
const addGuestMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, guestBook_service_1.addGuestMessageService)(Object.assign(Object.assign({}, req.body), { ip: req === null || req === void 0 ? void 0 : req.ip }));
        res.status(result === null || result === void 0 ? void 0 : result.statusCode).json({
            success: result === null || result === void 0 ? void 0 : result.success,
            message: result === null || result === void 0 ? void 0 : result.message,
            data: result === null || result === void 0 ? void 0 : result.data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Ops! Something went wrong!. Try again.",
        });
    }
});
exports.addGuestMessageController = addGuestMessageController;
const getGuestMessagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, guestBook_service_1.getGuestMessagesService)();
        res.status(result === null || result === void 0 ? void 0 : result.statusCode).json({
            success: result === null || result === void 0 ? void 0 : result.success,
            message: result === null || result === void 0 ? void 0 : result.message,
            data: (_a = result === null || result === void 0 ? void 0 : result.data) !== null && _a !== void 0 ? _a : [],
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error on data retrieval.",
        });
    }
});
exports.getGuestMessagesController = getGuestMessagesController;
