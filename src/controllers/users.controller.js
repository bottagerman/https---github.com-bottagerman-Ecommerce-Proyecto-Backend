import { UserModel } from "../DAO/models/users.models.js";
import { UserService } from "../service/users.service.js";

//const userController = new UserMongo();
const userService = new UserService();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userController.getAll();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    await userService.createNewUser(firstName, lastName, age, email, password);
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect("/login");
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .render("errorPage", { msg: "ERROR! Check your email" });
  }
};

export const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findAUser(email, password);
    req.session.user = user;
    return res.redirect("/profile");
  } catch (error) {
    return res
      .status(400)
      .render("errorPage", { msg: "ERROR! Invalid email or password" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userController.deleteOne(id);
    return res.status(200).json({
      status: "success",
      msg: "user deleted",
      data: {},
    });
  } catch (error) {
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const updatedUser = await userController.updateOne(
      id,
      firstName,
      lastName,
      email
    );
    return res.status(200).json({
      status: "success",
      msg: "user updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

export const userSession = async (req, res) => {
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
};
export const userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("errorPage", { msg: "Cannot close the session" });
    }
    return res.redirect("/login");
  });
};
