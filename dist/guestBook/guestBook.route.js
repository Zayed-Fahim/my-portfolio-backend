"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestBookRoutePost = void 0;
const express_1 = __importDefault(require("express"));
const guestBook_controller_1 = require("./guestBook.controller");
const guestBookRouteGet = express_1.default.Router();
guestBookRouteGet.route("/").get(guestBook_controller_1.getGuestMessagesController);
exports.guestBookRoutePost = guestBook_controller_1.addGuestMessageController;
exports.default = guestBookRouteGet;
