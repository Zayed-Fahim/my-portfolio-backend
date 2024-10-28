"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const email_route_1 = __importDefault(require("./email/email.route"));
const project_route_1 = __importDefault(require("./project/project.route"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json({
    limit: "10mb",
    strict: true,
    inflate: true,
    type: "application/json",
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf.toString());
        }
        catch (e) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid JSON" });
        }
    },
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 1000,
}));
app.use("/api/v2/email", email_route_1.default);
app.use("/api/v2/projects", project_route_1.default);
if (process.env.NODE_ENV !== "production") {
    (0, swagger_1.default)(app, Number(config_1.default.port));
}
else {
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "My portfolio server is running successfully.",
        });
    });
}
exports.default = app;
