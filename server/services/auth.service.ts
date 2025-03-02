import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../types/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
};


export const registerUser = async (username: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  return generateToken(user);
};


export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken(user);
};
