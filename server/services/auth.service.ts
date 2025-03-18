
import User from "../models/User";
import { comparePasswords, generateToken, hashPassword } from "../utils/utils";


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
