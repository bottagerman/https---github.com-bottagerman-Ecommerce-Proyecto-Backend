import express from "express";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import * as UserController from "../controllers/users.controller.js";
import * as ProductsController from "../controllers/products.controller.js";
import { loggerDev } from "../utils/logger.js";
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
  const user = {
    firstName: req.session.user.firstName,
    age: req.session.user.age,
    cart: req.session.user.cart,
  };
  res.render("profile", user);
});

routerViews.get("/only-admin", checkAdmin, async (req, res) => {
  const admin = {
    firstName: req.session.user.firstName,
    rol: req.session.user.admin,
  };
  const productId = req.body.pid;
  res.render("adminPage", { admin, productId });
});
