import { Router } from "express";
import { createStoryHandler, getStoriesHandler, approveBranchHandler } from "../controllers/story.controller";

const router = Router();

router.post("/", createStoryHandler);
router.get("/", getStoriesHandler);
router.post("/:id/approve", approveBranchHandler);

export default router;
