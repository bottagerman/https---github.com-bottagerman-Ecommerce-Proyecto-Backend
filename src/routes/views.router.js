import express from "express";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import * as UserController from "../controllers/users.controller.js";
export const routerViews = express.Router();

routerViews.get("/", (req, res) => {
  res.render("home");
});

routerViews.get("/logout", UserController.userLogout);

routerViews.get("/login", (req, res) => {
  res.render("loginForm");
});

routerViews.get("/register", (req, res) => {
  res.render("registerForm");
});

routerViews.get("/profile", checkUser, (req, res) => {
  const user = { firstName: req.session.user.firstName, age: req.session.user.age };
  res.render("profile", user);
});

routerViews.get("/only-admin", checkAdmin, (req, res) => {
  res.send("ONLY ADMIN CAN SEE THIS MSG");
});
