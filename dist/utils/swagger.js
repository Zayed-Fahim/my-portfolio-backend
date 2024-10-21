"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rest API for Portfolio",
            version: "2.0.0",
            description: "API for managing portfolio.",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Development server",
            },
        ],
    },
    apis: ["src/routes/*.ts", "src/Models/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`Swagger documentation is available at http://localhost:${port}/api-docs`);
};
exports.default = swaggerDocs;
