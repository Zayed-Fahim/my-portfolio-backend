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
exports.getGuestMessagesService = exports.addGuestMessageService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_controller_1 = require("../user/user.controller");
const guestBook_model_1 = __importDefault(require("./guestBook.model"));
const addGuestMessageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = Object.assign(Object.assign({}, data.user), { ip: data.ip });
    const userResponse = yield (0, user_controller_1.addGuestUserController)(userInfo);
    if ((userResponse === null || userResponse === void 0 ? void 0 : userResponse.id) && mongoose_1.default.Types.ObjectId.isValid(userResponse.id)) {
        const newMessageData = { content: data.message, user: userResponse.id };
        const result = yield guestBook_model_1.default.create(newMessageData);
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
});
exports.addGuestMessageService = addGuestMessageService;
const getGuestMessagesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield guestBook_model_1.default.find({})
        .populate({
        path: "user",
        select: "-ip -email -__v -createdAt -updatedAt -_id",
    })
        .select("-__v -updatedAt -_id");
    return {
        statusCode: 200,
        success: true,
        message: "Data retrieved successfully!",
        data: result !== null && result !== void 0 ? result : [],
    };
});
exports.getGuestMessagesService = getGuestMessagesService;
