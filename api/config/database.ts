import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://mongodb:27017/math';
    await mongoose.connect(mongoUrl);
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
} 