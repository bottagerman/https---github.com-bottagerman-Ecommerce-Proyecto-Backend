import express from "express";
import { product } from "../DAO/handlers/productManger.js";
export const routerProductsView = express.Router();

// GET ALL PRODUCTS
routerProductsView.get("/", (req, res) => {
  let allProducts = product.getProducts();
  return res.render("home", { allProducts });
});

// GET PRODUCTS IN REAL TIME

routerProductsView.get("/realtimeproducts", (req, res) => {
  const allProducts = product.getProducts();
  if (allProducts.length > 0) {
    return res.render("realTimeProducts", { allProducts });
  } else {
    return res.send("No products have been updated.");
  }
});
