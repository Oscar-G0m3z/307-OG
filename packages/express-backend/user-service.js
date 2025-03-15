import userModel from "./models/user.js";

async function addUser(user) {
  try {
    console.log("📩 Attempting to save user:", user); // Debugging line
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    console.log("✅ User successfully saved:", savedUser); // Debugging line
    return savedUser;
  } catch (error) {
    console.error("❌ Error saving user:", error);
    throw error;
  }
}

export default { addUser };
