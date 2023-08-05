import express from "express";
import * as CartController from "../controllers/carts.controller.js";  

export const routerCart = express.Router();

routerCart.post("/", CartController.createCart);  
routerCart.get("/:cid", CartController.getCartById);  
routerCart.post("/:cid/products/:pid", CartController.addProductToCart);  

export default routerCart;
