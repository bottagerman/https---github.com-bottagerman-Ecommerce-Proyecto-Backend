import express from "express";
import { UserModel } from "../DAO/models/users.models.js";
export const routerUsers = express.Router();

routerUsers.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "lista de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerUsers.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      console.log("Validation error, please complete all the fields");
      return res.status(400).json({
        status: "error",
        msg: "Validation error, please complete all the fields",
        data: {},
      });
    }
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return res.status(200).json({
      status: "success",
      msg: "lista de usuarios",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerUsers.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email || !id) {
      console.log("Validation error, please complete all the fields");
      return res.status(400).json({
        status: "error",
        msg: "Validation error, please complete all the fields",
        data: {},
      });
    }
    const userUpdater = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return res.status(200).json({
      status: "success",
      msg: "user updated",
      data: userUpdater,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
