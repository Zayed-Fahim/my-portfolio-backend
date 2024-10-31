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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const app_1 = __importDefault(require("../app"));
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoURL = config_1.default.mongoURL;
    try {
        yield mongoose_1.default.connect(mongoURL);
        console.log("Database connected successfully.");
        if ((config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.nodeEnvironment) !== "production") {
            app_1.default.listen(config_1.default.port || 3001, () => console.log(`Swagger documentation is available at http://localhost:${config_1.default.port}/api-docs`));
        }
        else {
            app_1.default.listen(config_1.default.port || 3001, () => console.log(`Server is available at http://localhost:${config_1.default.port}`));
        }
    }
    catch (err) {
        console.error("Error connecting to database:", err.message);
        throw err;
    }
});
exports.default = connect;
