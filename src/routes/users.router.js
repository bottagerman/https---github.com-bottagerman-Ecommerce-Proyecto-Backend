import express from "express";
import * as UserController from "../controllers/users.controller.js";

export const routerUsers = express.Router();

routerUsers.get("/", UserController.getAllUsers);
routerUsers.delete("/:id", UserController.deleteUser);
routerUsers.put("/:id", UserController.updateUser);