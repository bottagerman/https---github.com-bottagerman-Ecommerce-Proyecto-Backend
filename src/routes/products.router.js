import express from "express";
import { checkCart } from "../middlewares/auth.js";
import * as ProductController from "../controllers/products.controller.js";

export const routerProducts = express.Router();

routerProducts.get("/", ProductController.getProducts);
routerProducts.get("/:id", ProductController.getProductById);
routerProducts.post("/", ProductController.createProduct);
routerProducts.delete("/:id", ProductController.deleteProduct);
routerProducts.put("/:id", ProductController.updateProduct);
