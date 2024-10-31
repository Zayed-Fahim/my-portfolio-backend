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
exports.addGuestUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const addGuestUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const found = yield user_model_1.default.findOne({ email: data.email });
    if (found)
        return { id: found === null || found === void 0 ? void 0 : found._id };
    const authorGmailList = [
        "nirob.fahim.1000.bf@gmail.com",
        "sayed15-13268@diu.edu.bd",
        "sayedasifzayed@gmail.com",
        "work.zayedfahim@gmail.com",
    ];
    const isAuthor = authorGmailList.includes(data.email);
    const newUserData = {
        ip: data.ip,
        type: isAuthor ? "author" : "user",
        email: data.email,
        name: data.name,
        image: data.image || "",
    };
    const result = yield user_model_1.default.create(newUserData);
    return { id: result === null || result === void 0 ? void 0 : result._id };
});
exports.addGuestUserService = addGuestUserService;
