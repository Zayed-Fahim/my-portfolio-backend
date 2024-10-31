import mongoose from "mongoose";
import { GuestBookProps } from "./guestBook.interface";

const guestBookSchema = new mongoose.Schema<GuestBookProps>(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GuestBook = mongoose.model("GuestBook", guestBookSchema);
export default GuestBook;
