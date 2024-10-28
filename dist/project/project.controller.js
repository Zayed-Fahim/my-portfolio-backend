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
exports.getProjectsController = exports.addProjectController = void 0;
const project_service_1 = require("./project.service");
const addProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, project_service_1.addProjectService)(req.body);
        res.status(result.statusCode).json({
            success: result === null || result === void 0 ? void 0 : result.success,
            message: result === null || result === void 0 ? void 0 : result.message,
            data: (_a = result === null || result === void 0 ? void 0 : result.data) !== null && _a !== void 0 ? _a : [],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Ops! Something went wrong!. Try again.",
        });
    }
});
exports.addProjectController = addProjectController;
const getProjectsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, project_service_1.getProjectsService)(req.query);
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
exports.getProjectsController = getProjectsController;
