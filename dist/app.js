"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const email_route_1 = __importDefault(require("./email/email.route"));
const guestBook_route_1 = __importStar(require("./guestBook/guestBook.route"));
const project_route_1 = __importDefault(require("./project/project.route"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const app = (0, express_1.default)();
app.set("trust proxy", true);
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
// rate limit settings
let allowlist = [];
if (config_1.default.nodeEnvironment === "production") {
    allowlist = (_a = config_1.default.allowlistIpsProduction) === null || _a === void 0 ? void 0 : _a.split(",");
}
else {
    allowlist.push(config_1.default.allowlistIpDevelopment);
}
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 24 * 60 * 60 * 1000,
    limit: 5,
    message: (req, res) => res.status(409).json({
        success: false,
        message: "Your limit exceeded! Please try again next day.",
    }),
    keyGenerator: (req, res) => req.ip,
    handler: (req, res, next, options) => res.status(options.statusCode).send(options.message),
    skip: (req, res) => allowlist.includes(req.ip),
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/v2/email", email_route_1.default);
app.use("/api/v2/projects", project_route_1.default);
app.use("/api/v2/guest-book", guestBook_route_1.default);
app.post("/api/v2/guest-book", exports.limiter, guestBook_route_1.guestBookRoutePost);
if (config_1.default.nodeEnvironment !== "production") {
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
