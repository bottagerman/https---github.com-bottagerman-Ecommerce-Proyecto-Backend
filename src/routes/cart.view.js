import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { CartManagerMongo } from "../mongo/cart.mongo.js";
import * as cartController from "../controllers/carts.controller.js"
import { checkCartSession } from "../middlewares/auth.js";

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
      res.status(200).render("cartDetail", {cart})
  });

  routerCartViews.post("/", checkCartSession, cartController.createCart )