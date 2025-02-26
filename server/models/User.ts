import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/interfaces";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedStories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
});

export default mongoose.model<IUser>("User", UserSchema);
