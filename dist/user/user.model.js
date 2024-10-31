"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    ip: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^((([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){1,7}([0-9a-fA-F]{1,4}|:))|(::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}))$/,
        index: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ["user", "author"],
        default: "user",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
