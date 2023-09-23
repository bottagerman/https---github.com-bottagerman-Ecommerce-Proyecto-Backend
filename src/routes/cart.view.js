import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { CartManagerMongo } from "../mongo/cart.mongo.js";
import * as cartController from "../controllers/carts.controller.js";
import { checkCartSession } from "../middlewares/auth.js";

export const routerCartViews = Router();

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();

routerCartViews.get("/:cid", cartController.getCartById);

routerCartViews.post("/", cartController.createCart);
