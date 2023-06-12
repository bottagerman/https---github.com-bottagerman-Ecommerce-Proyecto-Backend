//@ts-check
import express from "express";
// import { cart } from "../DAO/handlers/cartManager.js";
import { routerProducts } from "./products.router.js";
import { CartManagerMongo } from "../services/cart.services.js";


export const routerCart = express.Router();
routerCart.use("/products", routerProducts);

const cartManagerMongo = new CartManagerMongo();

// CREATE NEW CART
routerCart.post("/", async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    res.status(201).send({ status: "success", data: userCart });
  } catch (error) {
    res.status(400).send({ status: "error", error: "Error creating the new cart" });
  }
});

// GET PRODUCTS IN CART
routerCart.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cartId = await cartManagerMongo.getCartId(cid);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: "Error calling the cart"  });
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartManagerMongo.addProductToCart(cid, pid);

    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: "Error adding product in the cart" });
  }
});
