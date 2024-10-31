import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import path from "path";
import config from "./config";
import emailRoute from "./email/email.route";
import guestBookRouteGet, {
  guestBookRoutePost,
} from "./guestBook/guestBook.route";
import projectRoute from "./project/project.route";
import swaggerDocs from "./utils/swagger";

const app: Express = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.json({
    limit: "10mb",
    strict: true,
    inflate: true,
    type: "application/json",
    verify: (req: Request, res: Response, buf: Buffer) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid JSON" });
      }
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 1000,
  })
);

// rate limit settings
let allowlist: string[] = [];
if (config.nodeEnvironment === "production") {
  allowlist = config.allowlistIpsProduction?.split(",")!;
} else {
  allowlist.push(config.allowlistIpDevelopment!);
}

export const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 5,
  keyGenerator: (req: Request, res: Response) => req.ip!,
  handler: (req: Request, res: Response, next: NextFunction, options) =>
    res.status(options.statusCode).json({
      message: "Your limit exceeded! Please try again next day.",
      success: false,
    }),
  skip: (req: Request, res: Response) => allowlist.includes(req.ip!),
  skipFailedRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v2/email", emailRoute);
app.use("/api/v2/projects", projectRoute);
app.use("/api/v2/guest-book", guestBookRouteGet);
app.post("/api/v2/guest-book", limiter, guestBookRoutePost);

if (config.nodeEnvironment !== "production") {
  swaggerDocs(app, Number(config.port));
} else {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "My portfolio server is running successfully.",
    });
  });
}

export default app;
