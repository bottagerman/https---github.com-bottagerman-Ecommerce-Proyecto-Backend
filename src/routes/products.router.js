import express from "express";
import { checkRoll, checkCart } from "../middlewares/auth.js";
import * as ProductController from "../controllers/products.controller.js";

export const routerProducts = express.Router();

routerProducts.get("/", ProductController.getProducts);
routerProducts.get("/:pid", ProductController.getProductById);
routerProducts.post("/", checkRoll, ProductController.createProduct);
routerProducts.delete("/:pid", ProductController.deleteProduct);
routerProducts.put("/:pid", ProductController.updateProduct);
