import express from "express";
import userService from "./user-services.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
  
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user) res.json(user);
      else res.status(404).json({ error: "User not found" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => res.status(201).json(newUser))
    .catch((error) => res.status(500).json({ error: error.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
