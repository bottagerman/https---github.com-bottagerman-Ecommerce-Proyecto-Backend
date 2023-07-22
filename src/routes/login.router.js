import express from "express";
import passport from "passport";
import { UserModel } from "../DAO/models/users.models.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";


export const routerLogin = express.Router();

routerLogin.post("/register", async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  if (!firstName || !lastName || !age || !email || !password) {
    return res
      .status(400)
      .render("errorPage", { msg: "ERROR! Complete all the fields" });
  }
  try {
    await UserModel.create({
      firstName,
      lastName,
      age,
      email,
      password: createHash(password),
      admin: false,
    });
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect("/profile");
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .render("errorPage", { msg: "ERROR! Check your email" });
  }
});

routerLogin.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .render("errorPage", { msg: "ERROR! Complete all the fields" });
  }
  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser && isValidPassword(foundUser, password)) {
      req.session.user = { 
        firstName: foundUser.firstName,
        email: foundUser.email,
        admin: foundUser.admin,
        _id: foundUser._id.toString(),
      };

      return res.redirect("/profile");
    } else {
      return res
        .status(400)
        .render("errorPage", { msg: "ERROR! Invalid email or password" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .render("errorPage", { msg: "Internal server ERROR!" });
  }
});

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
    res.redirect("/views/products");
  }
);

routerLogin.get("/show", (req, res) => {
  return res.send(JSON.stringify(req.session));
});

routerLogin.get("/current", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(400).json({
        status: "error",
        msg: "User data not found in the session",
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "session data",
      payload: req.session.user,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .render("errorPage", { msg: "Internal server ERROR!" });
  }
});

