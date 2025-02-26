import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import storyRoutes from "./routes/story";

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/stories", storyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
