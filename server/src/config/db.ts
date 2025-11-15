import mongoose from 'mongoose';
import config from "./env";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`MongoDB connection error: ${error.message}`);
    } else {
      console.error("MongoDB connection error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
