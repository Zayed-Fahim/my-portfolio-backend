"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    styles: {
        backgroundImage: {
            type: String,
            required: true,
        },
        brandColor: {
            type: String,
            required: true,
        },
    },
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    shortDescription: {
        type: String,
        trim: true,
        required: true,
    },
    technologies: [
        new mongoose_1.default.Schema({
            name: {
                type: String,
                required: true,
            },
            icon: {
                name: {
                    type: String,
                    trim: true,
                    required: true,
                },
                className: {
                    type: String,
                    trim: true,
                    required: true,
                },
                fill: {
                    type: String,
                    trim: true,
                    required: false,
                },
            },
        }, { _id: false }),
    ],
    image: {
        type: String,
        required: true,
    },
    liveSite: {
        type: String,
        required: true,
    },
    clientRepo: {
        type: String,
        required: true,
    },
    serverRepo: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: true,
        required: true,
    },
}, { timestamps: true });
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
