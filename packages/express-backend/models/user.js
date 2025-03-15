import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
});

const userModel = mongoose.model("users_list", userSchema); // Ensure correct collection name

export default userModel;