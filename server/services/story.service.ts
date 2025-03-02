import Story from "../models/Story";
import { IStory } from "../types/interfaces";
import { Types } from "mongoose";

export const createStory = async (data: IStory) => {
  const story = new Story(data);
  await story.save();

  if (data.parentBranch) {
    await Story.findByIdAndUpdate(data.parentBranch, { $push: { childBranches: story._id } });
  }

  return story;
};

export const getStories = async () => Story.find().populate("author", "username");


export const approveBranch = async (id: string) => {
  const story = await Story.findById(id);
  if (!story || !story.parentBranch) throw new Error("Invalid branch story");

  await Story.findByIdAndUpdate(story.parentBranch, { isApproved: true });
  return { message: "Branch approved, parent locked" };
};
