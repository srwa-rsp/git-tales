import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types/interfaces";
import { JWT_SECRET } from "./consts";


export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  export const comparePasswords = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "15d" });
  };