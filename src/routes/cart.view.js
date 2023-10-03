import { Router } from "express";
import * as cartController from "../controllers/carts.controller.js";
import { checkCartSession } from "../middlewares/auth.js";

export const routerCartViews = Router();


routerCartViews.get("/:cid", cartController.readAndRender);
routerCartViews.post("/", checkCartSession, cartController.createCart);
