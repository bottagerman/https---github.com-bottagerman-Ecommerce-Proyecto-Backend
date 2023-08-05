import {UserService} from "../mongo/user.mongo.js";

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
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await userService.createOne(firstName, lastName, email);
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteOne(id);
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
    const updatedUser = await userService.updateOne(
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
