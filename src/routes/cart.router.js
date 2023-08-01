//@ts-check
import express from "express";
import { routerProducts } from "./products.router.js";
import { CartManagerMongo } from "../mongo/cart.mongo.js";

export const routerCart = express.Router();
 routerCart.use("/products", routerProducts);

const cartManagerMongo = new CartManagerMongo();

// CREATE NEW CART
routerCart.post("/", async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    res.status(201).send({ status: "success", data: userCart });
  } catch (error) {
    res.status(400).send({ status: "error", error: "Cart not created" });
  }
});
// GET PRODUCTS IN CART
routerCart.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cartId = await cartManagerMongo.getCartId(cid);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

// ADD PRODUCT TO CART
routerCart.post("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartManagerMongo.addProductToCart(cid, pid);

    res
      .status(200)
      .send({ status: "success", data: "product added: " + cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

// DELETE PRODUCT FROM CART
routerCart.delete("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let body = req.body;
    const cartId = await cartManagerMongo.updateQuantityProductFromCart(
      cid,
      pid,
      body
    );
    res.status(200).send({ status: "success" });
  } catch (error) {
    res
      .status(404)
      .send({ status: "error", error: "Error deleting the product from the cart" });
  }
});

// DELETE ALL PRODUCTS FROM CART
routerCart.delete("/:cid/products", async (req, res) => {
  try {
    const cid = req.params.cid;
    await cartManagerMongo.deleteAllProductsFromCart(cid);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res
      .status(404)
      .send({ status: "error", error: "Error deleting all the products from the cart" });
  }
});

//UPDATE THE PRODUCTS IN THE CART 
routerCart.put("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let body = req.body;
    const cartId = await cartManagerMongo.updateCartArray(cid, body);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});
//DELETE X QUANTITY OF A PRODUCT IN THE CART
routerCart.delete("/:cid/product/:pid/quantity", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartManagerMongo.deleteProductFromCart(cid, pid);

    res
      .status(200)
      .send({ status: "success", data: `Product ${pid} removed 1 quantity` });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

