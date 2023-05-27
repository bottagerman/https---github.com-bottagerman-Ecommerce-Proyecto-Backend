import express from "express";
import { product } from "../handlers/productManger.js";
export const routerProductsView = express.Router();


// GET ALL PRODUCTS 
routerProductsView.get("/", async (req, res) => {
  let allProducts = await product.getProducts()
  return res.render('home', {allProducts} ) 
})

// GET PRODUCTS IN REAL TIME 

routerProductsView.get("/realtimeproducts", (req, res) => {
  return res.render("realTimeProducts", { allProducts: product.getProducts()}) 
})