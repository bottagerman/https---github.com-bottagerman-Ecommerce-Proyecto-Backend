//@ts-check
import express from "express";
import { product } from "../../utils.js";
export const routerProducts = express.Router();

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

routerProducts.get("/:pId", async (req, res) => {
  try {
    const { pId } = req.params;
    const productId = await product.getProductById(pId);
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

routerProducts.delete("/:pId", async (req, res) => {
  try {
    const { pId } = req.params;
    const deletedProduct = await product.deleteProduct(pId);
    if (!deletedProduct) {
      res
        .status(404)
        .send({ status: "Error", msg: "Oooops! Product not found" });
    } else {
      res
        .status(200)
        .send({ status: "success", msg: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// CHANGE PRODUCT FIELD

routerProducts.put("/:pId", (req, res) => {
    try {
      const { pId } = req.params;
      const newData = req.body;
      const updatedProduct = product.updateProduct(pId, newData);
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
  
