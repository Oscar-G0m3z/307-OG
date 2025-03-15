import express from "express";
import userService from "./user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true); // Enables MongoDB query logging in the console

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    console.log("📩 Received request body:", req.body); // Log received data
    const newUser = await userService.addUser(req.body);
    console.log("✅ User saved in DB:", newUser); // Log saved user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Error adding user:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
