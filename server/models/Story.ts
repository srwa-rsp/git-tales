import mongoose, { Schema } from "mongoose";
import { IStory } from "../types/interfaces";

const StorySchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentBranch: { type: mongoose.Schema.Types.ObjectId, ref: "Story", default: null },
  childBranches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  isApproved: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: String }],
});

export default mongoose.model<IStory>("Story", StorySchema);
