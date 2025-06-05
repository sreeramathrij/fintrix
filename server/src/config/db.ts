import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if(!mongoURI) {
      console.error("Incorrect mongoDB URI");
      return;
    }
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected ✅")
  } catch (error){
    console.error("mongoDB connection error: ", error)
  }
}