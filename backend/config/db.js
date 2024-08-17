import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI); // No need for deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure code
  }
};

export default connectDB;
