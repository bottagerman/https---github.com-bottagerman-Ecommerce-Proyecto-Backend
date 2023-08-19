import express from "express";
export const routerPurchases = express.Router();
import { ticketsController } from "../controllers/tickets.controller.js";
import { checkUser } from "../middlewares/main.js";

routerPurchases.get("/", checkUser, ticketsController.readByRender);