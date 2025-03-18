import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import User from "../models/User";
import { AuthRequest } from "../types/interfaces";
import { JwtPayload } from "jsonwebtoken";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const token = await registerUser(username, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const getProfileHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = (req.user as JwtPayload).id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};
