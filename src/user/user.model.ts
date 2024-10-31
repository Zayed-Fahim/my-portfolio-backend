import mongoose from "mongoose";
import { UserProps } from "./user.interface";

const userSchema = new mongoose.Schema<UserProps>(
  {
    ip: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match:
        /^((([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){1,7}([0-9a-fA-F]{1,4}|:))|(::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}))$/,
      index: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["user", "author"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
