//@ts-check
import express from "express";
import { cart } from "../../utils";
import { product } from "../../utils";

export const routerCart = express.Router();

// CART 

routerCart.get("/:cId", async (req, res) =>{
    try{
        const {cId} = req.params;
        const newCart = cart.addCart(product, cId)
    }
})