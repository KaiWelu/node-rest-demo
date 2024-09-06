import mongoose from "mongoose";

// this creates a new mongoose user schema

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // select false lets you not manipulate the data
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// this makes the schema available with the name "User"

export const UserModel = mongoose.model("User", UserSchema);
