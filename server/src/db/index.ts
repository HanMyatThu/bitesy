import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("DB is connected");
  } catch {
    console.log("Error in connecting to database");
  }
};
