import express from "express";
import { product } from "../handlers/productManger.js";
export const routerProductsView = express.Router();


// GET ALL PRODUCTS AND SET LIMIT
routerProductsView.get("/", async (req, res) => {
  let allProducts = await product.getProducts()
  return res.render('home', {allProducts} ) 
})