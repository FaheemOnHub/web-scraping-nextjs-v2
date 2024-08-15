"use server";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) return console.log("mongo uri is not defined");
  if (isConnected) return console.log("connection already exists");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB is connected--😍");
  } catch (error) {
    console.log(error);
  }
};
