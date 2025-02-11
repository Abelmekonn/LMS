import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
        setTimeout(() => connectDb(), 5000); // ✅ Correct way to retry
    }
};

export default connectDb;