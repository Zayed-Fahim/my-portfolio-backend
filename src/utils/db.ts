import mongoose from "mongoose";
import config from "../config";
import app from "../app";

const connect = async () => {
  const port = config.port || 3001;
  const mongoURL: string = config.mongoURL;

  try {
    await mongoose.connect(mongoURL);
    console.log("Database Connected.");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err: any) {
    console.error("Error connecting to database:", err.message);
    throw err;
  }
};

export default connect;
