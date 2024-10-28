import express, { Express, Request, Response } from "express";
import cors from "cors";
import emailRoute from "./email/email.route";
import projectRoute from "./project/project.route";
import swaggerDocs from "./utils/swagger";
import config from "./config";
import path from "path";

const app: Express = express();

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

app.use("/api/v2/email", emailRoute);
app.use("/api/v2/projects", projectRoute);

if (process.env.NODE_ENV !== "production") {
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
