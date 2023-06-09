import express from "express";
import { cart } from "../DAO/handlers/cartManager.js";
import { routerProducts } from "./products.router.js";
export const routerCart = express.Router();
routerCart.use("/products", routerProducts);

// CREATE NEW CART
routerCart.post("/", (req, res) => {
  const newCart = {
    cId: (Math.random() * 10000000).toFixed(0),
    products: [],
  };
  cart.addCart(newCart);
  return res.status(200).send({ status: "success", data: newCart });
});

// GET PRODUCTS IN CART
routerCart.get("/:cId", (req, res) => {
  const { cId } = req.params;
  const selectedCart = cart.getCartById(cId);
  if (!selectedCart) {
    res.status(404).send({ status: "Error", msg: "Oooops! Cart not found" });
  } else {
    res.status(200).send({ status: "success", data: selectedCart.products });
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const productAddToCart = await cart.addItemToCart(cartId, prodId);
    const cart = await cart.getCartById(cartId);

    if (productAddToCart) {
      return res.status(201).json({
        status: "success",
        msg: "Product added",
        data: cart,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "Product not added",
        data: {},
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
      data: {},
    });
  }
});
