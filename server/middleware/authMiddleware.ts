import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/consts";
import { AuthRequest } from "../types/interfaces";




export const protect = async (req: AuthRequest, res: Response, next: NextFunction) :Promise<void> => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Unauthorized" });
     return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Invalid token");
   res.status(401).json({ message: "Invalid token" });
   return;
  }
};