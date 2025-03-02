import { Router } from "express";
import { registerHandler, loginHandler, getProfileHandler } from "../controllers/auth.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/profile", protect, getProfileHandler);

export default router;
