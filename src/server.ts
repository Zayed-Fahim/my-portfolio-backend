import dotenv from "dotenv";
import connect from "./utils/db";

dotenv.config();

(async () => {
  try {
    await connect();
  } catch (error) {
    console.error(
      "Failed to start the server due to database connection error:",
      error
    );
    process.exit(1);
  }
})();
