import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../services/products.services.js";



export const routerProductsView = Router();
const productManagerMongo = new ProductManagerMongo();

routerProductsView.use(express.json());
routerProductsView.use(express.urlencoded({ extended: true }));

// GET ALL PRODUCTS
routerProductsView.get("/", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query);

  res.status(200).render("home", {
    p: allProducts.docs.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
    })),
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
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
