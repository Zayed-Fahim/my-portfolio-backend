import mongoose from "mongoose";
import config from "../config";
import app from "../app";

const connect = async () => {
  const mongoURL = config.mongoURL!;

  try {
    await mongoose.connect(mongoURL);
    console.log("Database connected successfully.");

    if (config?.nodeEnvironment !== "production") {
      app.listen(config.port || 3001, () =>
        console.log(
          `Swagger documentation is available at http://localhost:${config.port}/api-docs`
        )
      );
    } else {
      app.listen(config.port || 3001, () =>
        console.log(`Server is available at http://localhost:${config.port}`)
      );
    }
  } catch (err: any) {
    console.error("Error connecting to database:", err.message);
    throw err;
  }
};

export default connect;
