import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  likedStories: Types.ObjectId[];
}

export interface IStory extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    parentBranch?: Types.ObjectId | null;
    childBranches: Types.ObjectId[];
    isApproved: boolean;
    isPublic: boolean;
    likes: Types.ObjectId[];
    comments: { user: Types.ObjectId; text: string }[];
  }
