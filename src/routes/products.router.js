//@ts-check

import express from "express";
//import { product } from "../DAO/handlers/productManger.js";
import { ProductManagerMongo } from "../services/products.services.js";
export const routerProducts = express.Router();

const productManagerMongo = new ProductManagerMongo();

// POST NEW PRODUCT
routerProducts.post("/", async (req, res) => {
  let newProduct = req.body;
  try {
    const addProduct = await productManagerMongo.addProduct(newProduct);
    res.status(201).send({ status: "success", data: addProduct });
  } catch (error) {
    res.status(400).send({
      status: "error",
      data: "Error creating a new product",
    });
  }
});

// GET ALL PRODUCTS
routerProducts.get("/", async (req, res) => {
  try {
    const allProducts = await productManagerMongo.getProducts();

    res.status(200).send({ status: "success", data: allProducts });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});
routerProducts.get("/", async (req, res) => {
  try {
    const allProductsLimit = await productManagerMongo.getProductsLimit(req.query);

    res.status(200).send({
      payload: allProductsLimit.docs.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        thumbnails: product.thumbnails,
        status: product.status,
        code: product.code,
        category: product.category,
      })),
      totalPages: allProductsLimit.totalPages,
      prevPage: allProductsLimit.prevPage,
      nextPage: allProductsLimit.nextPage,
      page: allProductsLimit.page,
      hasPrevPage: allProductsLimit.hasPrevPage,
      hasNextPage: allProductsLimit.hasNextPage,
    });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});

// GET PRODUCTS BY ID
routerProducts.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const findProduct = await productManagerMongo.getProductById(pid);
    res.status(200).send({ status: "success", data: findProduct });
  } catch (error) {
    res.status(401).send(error);
  }
});

// DELETE PRODUCT
routerProducts.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  console.log(pid);

  try {
    const deleteProduct = await productManagerMongo.deleteProduct(pid);
    res.status(200).send({
      status: "success",
      data: "Product deleted:" + deleteProduct,
    });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

// CHANGE PRODUCT FIELD
routerProducts.put("/:pid", async (req, res) => {
  let updateProductClient = req.body;
  let pid = req.params.pid;
  try {
    const updateProduct = await productManagerMongo.updateProduct(
      pid,
      updateProductClient
    );
    res.status(200).send({ status: "success", data: updateProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});
