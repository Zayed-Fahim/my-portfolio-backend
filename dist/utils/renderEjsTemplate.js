"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEjsTemplate = void 0;
const ejs_1 = __importDefault(require("ejs"));
const renderEjsTemplate = (templatePath, data) => {
    return new Promise((resolve, reject) => {
        ejs_1.default.renderFile(templatePath, data, (err, html) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(html);
            }
        });
    });
};
exports.renderEjsTemplate = renderEjsTemplate;
