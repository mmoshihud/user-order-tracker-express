import { Schema, model } from "mongoose";
import type User from "../Interface/UserInterface";

const userSchema: Schema = new Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
