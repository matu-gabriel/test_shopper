import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    console.log("Connecting to DB");
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("DB connected");
  } catch {
    throw new Error("DB not connected");
  }
};

export default connectDB;
