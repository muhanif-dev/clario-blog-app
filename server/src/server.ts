import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;

// Cached connection for serverless environment
let isConnected = false;

export async function connectDB() {
    if (isConnected) return;
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB is connected successfully");
}

// Connect DB on serverless invocation
connectDB().catch((err) => console.log("DB Connection Error:", err));

// Only listen locally, export for Vercel serverless
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running at PORT: ${PORT}`);
    });
}

export default app;