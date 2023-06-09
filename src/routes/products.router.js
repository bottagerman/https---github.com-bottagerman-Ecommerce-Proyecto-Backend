//@ts-check

import express from "express";
import { product } from "../DAO/handlers/productManger.js";
export const routerProducts = express.Router();

// POST NEW PRODUCT
routerProducts.post("/", (req, res) => {
  let newProduct = req.body;
  newProduct.status = true;
  newProduct.date = Date.now();
  newProduct.id = (Math.random() * 10000000).toFixed(0);
  product.addProduct(newProduct);
  product.products.push(newProduct);
  product.writeDataToFile();
  return res.status(200).send({ status: "success", data: newProduct });
});

// GET ALL PRODUCTS AND SET LIMIT
routerProducts.get("/", async (req, res) => {
  try {
    const allProducts = await product.getProducts();
    const consulta = req.query;
    const setLimit = Object.keys(consulta).length;
    if (setLimit == 0) {
      res.status(200).send({
        status: "success",
        msg: "Showing all my products",
        data: allProducts,
      });
    } else {
      res
        .status(200)
        .send({ status: "success", data: allProducts.slice(0, setLimit) });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// GET PRODUCTS BY ID
routerProducts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await product.getProductById(id);
    if (!productId) {
      res
        .status(404)
        .send({ status: "Error", msg: "Oooops! Product not found" });
    } else {
      res.status(200).send({ status: "success", data: productId });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// DELETE PRODUCT
routerProducts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.deleteProduct(id);
    if (!deletedProduct) {
      res
        .status(404)
        .send({ status: "Error", msg: "Oooops! Product not found" });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Product deleted successfully",
        data: deletedProduct,
      });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// CHANGE PRODUCT FIELD
routerProducts.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedProduct = product.updateProduct(id, newData);
    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        msg: "Oooops! Product not found",
        data: {},
      });
    }
    return res.status(200).json({
      status: "success",
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
      data: {},
    });
  }
});
