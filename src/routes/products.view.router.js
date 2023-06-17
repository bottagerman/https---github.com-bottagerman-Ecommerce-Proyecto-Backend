import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../services/products.services.js";

export const routerProductsView = Router();
const productManagerMongo = new ProductManagerMongo();

routerProductsView.use(express.json());
routerProductsView.use(express.urlencoded({ extended: true }));

// GET ALL PRODUCTS
routerProductsView.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const sort = req.query.sort === "desc" ? "-price" : "price"; // Ordena por precio ascendente o descendente
  const allProducts = await productManagerMongo.getProductsLimit({ limit, sort });
  
  res.status(200).render("home", {
    allProducts: allProducts.docs.map((product) => ({
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    })),
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
