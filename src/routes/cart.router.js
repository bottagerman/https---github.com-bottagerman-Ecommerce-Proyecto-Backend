import express from "express";
import * as CartController from "../controllers/carts.controller.js";  
import { checkCartSession } from "../middlewares/auth.js";
export const routerCart = express.Router();

//routerCart.post("/", checkCartSession, CartController.createOrRedirectToCart);  
routerCart.post("/", checkCartSession, CartController.createCart);  
routerCart.get("/:cid",checkCartSession, CartController.getCartById);  
routerCart.post("/:cid/products/:pid", checkCartSession, CartController.addProductToCart);  

export default routerCart;
