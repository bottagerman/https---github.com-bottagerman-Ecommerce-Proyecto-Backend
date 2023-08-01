import express from "express";
import { UserModel } from "../DAO/models/users.models.js";
import { UserService } from "../mongo/user.mongo.js";

export const routerUsers = express.Router();

const Service = new UserService();

routerUsers.get("/", async (req, res) => {
  try {
    const users = await Service.getAll();
    console.log(users);
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).render('errorPage',{
      msg: 'Internal server ERROR!'
    });
  }
});

routerUsers.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email);
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).render('errorPage',{
      msg: 'Internal server ERROR!'
    });
  }
});

routerUsers.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      status: "success",
      msg: "user deleted",
      data: {},
    });
  } catch (e) {    
    return res.status(500).render('errorPage',{
      msg: 'Internal server ERROR!'
    });
  }
});

routerUsers.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      data: { _id: id, firstName, lastName, email },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).render('errorPage',{
      msg: 'Internal server ERROR!'
    });
  }
});
