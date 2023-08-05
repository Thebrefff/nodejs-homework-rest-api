import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValide } from "./hooks.js";

import { emailRegexp } from "../constans/user-constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("findByIdAndUpdate", handleUpdateValide);

userSchema.post("save", handleSaveError);
userSchema.post("findByIdAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
