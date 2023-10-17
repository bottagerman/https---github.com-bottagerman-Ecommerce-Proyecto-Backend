import express from "express";
import * as CartController from "../controllers/carts.controller.js";  
import * as TicketController from "../controllers/ticket.controller.js";  
import { checkCart, checkCartSession } from "../middlewares/auth.js";
export const routerCart = express.Router();

routerCart.post("/", checkCartSession, CartController.createCart);  
routerCart.get("/:cid", checkCartSession, CartController.getCartById);
routerCart.delete("/:cid/products/:pid", checkCartSession, CartController.removeProductFromCart)  
routerCart.post("/:cid/products/:pid",checkCart, CartController.addProductToCart);  
routerCart.post("/:cid/purchase", TicketController.purchaseCart)
export default routerCart;
