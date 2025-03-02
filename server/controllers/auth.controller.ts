import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import User from "../models/User";

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

export const getProfileHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};
