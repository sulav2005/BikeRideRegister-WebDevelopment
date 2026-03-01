import express from "express";
import { getAll, getUserById, save, updateUserById, deleteUserById, register, login } from "../Controller/userController.js";

const userroute = express.Router();

userroute.get("/", getAll);
userroute.post("/", save);
userroute.get("/:id", getUserById);
userroute.patch("/:id", updateUserById);
userroute.delete("/:id", deleteUserById);
userroute.post("/register", register);
userroute.post("/login", login);


export { userroute };

