import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config(); 
const MONGO_URI = process.env.MONGO_URI as string;
mongoose.connect(MONGO_URI).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
