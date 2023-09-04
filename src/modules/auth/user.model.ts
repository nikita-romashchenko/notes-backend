import mongoose from "mongoose";

interface User {
  uuid: string;
  username: string;
  passwordHash: string;
  accessToken: string;
}

const UserSchema = new mongoose.Schema<User>({
  uuid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<User>("Users", UserSchema);
