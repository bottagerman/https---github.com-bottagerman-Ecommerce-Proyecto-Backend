import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import * as cartController from "../controllers/carts.controller.js"
export const routerProductsView = Router();
const productManagerMongo = new ProductManagerMongo();

routerProductsView.use(express.json());
routerProductsView.use(express.urlencoded({ extended: true }));

// GET ALL PRODUCTS
routerProductsView.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const sort = req.query.sort === "desc" ? "-price" : "price"; 
  const allProducts = await productManagerMongo.getProductsLimit({ limit, sort });
  res.status(200).render("products", {
    allProducts: allProducts.docs.map((product) => ({
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      id: product._id
    , })),
    totalPages: allProducts.totalPages,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
    page: allProducts.page,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
   });
});

// GET PRODUCTS IN REAL TIME

routerProductsView.get("/realtimeproducts", (req, res) => {
  const allProducts = productManagerMongo.getProducts();
  if (allProducts.length > 0) {
    return res.render("realTimeProducts", { allProducts });
  } else {
    return res.send("No products have been updated.");
  }
});
