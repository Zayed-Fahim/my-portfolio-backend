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
exports.getProjectsService = exports.addProjectService = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
const addProjectService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield project_model_1.default.exists({ title: data.title });
    if (isExist) {
        return {
            statusCode: 409,
            success: false,
            message: "Project already exists!",
            data: [],
        };
    }
    const result = yield project_model_1.default.create(data);
    return {
        statusCode: 201,
        success: true,
        message: "Project added successfully!",
        data: result,
    };
});
exports.addProjectService = addProjectService;
const getProjectsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (data === null || data === void 0 ? void 0 : data.visible) {
        query = Object.assign(Object.assign({}, query), { isVisible: data.visible });
    }
    const result = yield project_model_1.default.find(query).select("-__v -createdAt -updatedAt -isVisible");
    if (!result) {
        return {
            statusCode: 404,
            success: false,
            message: "No projects found!",
            data: [],
        };
    }
    return {
        statusCode: 200,
        success: true,
        message: "Data retrieved successfully!",
        data: result,
    };
});
exports.getProjectsService = getProjectsService;
