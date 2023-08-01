import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { CartManagerMongo } from "../mongo/cart.mongo.js";

export const routerCartViews = Router ( ); 

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();

routerCartViews.get("/:cid", async (req, res) => {
    let cId = req.params.cid;
    const cart = await cartManagerMongo.getCartId(cId);
    const totalPrice = cart.products.reduce(
      (acc, product) => acc + product.quantity * product.product.price,
      0
    );
    console.log(totalPrice);
  
    res.status(200).render("cartDetail", {
      p: cart.products.map((product) => ({
        name: product.product.name,
        price: product.product.price,
        quantity: product.quantity,
      })),
      totalPrice,
    });
  });