import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import * as productController from "../controllers/products.controller.js"
export const routerProductsView = Router();
const productManagerMongo = new ProductManagerMongo();

routerProductsView.use(express.json());
routerProductsView.use(express.urlencoded({ extended: true }));

// GET ALL PRODUCTS
routerProductsView.get("/", productController.getLimitProduct)

// GET PRODUCTS IN REAL TIME

routerProductsView.get("/realtimeproducts", (req, res) => {
  const allProducts = productManagerMongo.getProducts();
  if (allProducts.length > 0) {
    return res.render("realTimeProducts", { allProducts });
  } else {
    return res.send("No products have been updated.");
  }
});
