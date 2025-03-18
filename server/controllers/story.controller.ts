import { Request, Response } from "express";
import { createStory, getStories, approveBranch } from "../services/story.service";

export const createStoryHandler = async (req: Request, res: Response) => {
  try {
    const story = await createStory(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error creating story", error });
  }
};

export const getStoriesHandler = async (_req: Request, res: Response) => {
  try {
    const stories = await getStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error });
  }
};

export const approveBranchHandler = async (req: Request, res: Response) => {
  try {
    const response = await approveBranch(req.params.id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error approving branch", error });
  }
};
