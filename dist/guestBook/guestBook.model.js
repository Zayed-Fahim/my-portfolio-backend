"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const guestBookSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const GuestBook = mongoose_1.default.model("GuestBook", guestBookSchema);
exports.default = GuestBook;
