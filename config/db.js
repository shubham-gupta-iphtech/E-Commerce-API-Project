import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Product.createIndexes();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export {connectDB};