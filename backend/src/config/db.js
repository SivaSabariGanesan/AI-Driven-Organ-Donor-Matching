import mongoose from "mongoose";

export async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    // eslint-disable-next-line no-console
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}


