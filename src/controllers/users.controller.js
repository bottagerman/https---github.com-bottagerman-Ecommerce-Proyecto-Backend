import UserDTO from "../DTO/users.dto.js";
import { UserService } from "../service/users.service.js";
import EErros from "../service/error/enums.js";
import CustomError from "../service/error/customErrors.js";

//const userController = new UserMongo();
const userService = new UserService();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Error getting all the users",
      message: "Error getting all the users",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    await userService.createNewUser(firstName, lastName, age, email, password);
    req.session.firstName = firstName;
    req.session.lastName = lastName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect("/login");
  } catch (e) {
    CustomError.createError({
      name: "ERROR-CREATE",
      cause: "Error creating a new user",
      message: "Error creating a new user",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findAUser(email, password);
    req.session.user = user;
    return res.redirect("/profile");
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Error logging, complete the email or password.",
      message: "Error logging, complete the email or password.",
      code: EErros.DATABASES_READ_ERROR,
    });
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
    CustomError.createError({
      name: "ERROR-DELETE",
      cause: "Error deleting this user, check the id",
      message: "Error deleting this user, check the id",
      code: EErros.DATABASES_READ_ERROR,
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
    CustomError.createError({
      name: "ERROR-UPDATE",
      cause: "Error updating this user, check all the fields that you want to change or look the id",
      message: "Error updating this user, check all the fields that you want to change or look the id",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const userSession = async (req, res) => {
  try {
    let user = new UserDTO(req.session.user);
    return res.status(200).json({
      status: "success",
      msg: "session data",
      payload: user,
    });
  } catch (e) {
    CustomError.createError({
      name: "ERROR-SESSION",
      cause: "Error looking the session of this user.",
      message: "Error looking the session of this user.",
      code: EErros.DATABASES_READ_ERROR,
    });;
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
