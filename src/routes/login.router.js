import express from "express";
import passport from "passport";
import * as UserController from "../controllers/users.controller.js";


export const routerLogin = express.Router();

routerLogin.post("/register", UserController.createUser) 

routerLogin.post("/login", UserController.logUser) 

routerLogin.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

routerLogin.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    // Successful authentication, redirect profile.
    res.redirect("/profile");
  }
);

routerLogin.get("/show", (req, res) => {
  return res.status(200).json(req.session);
});

routerLogin.get("/current", UserController.userSession);

