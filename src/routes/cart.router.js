//@ts-check
import express from "express";
import { cart } from "../../utils.js";
import { product } from "../../utils.js";
export const routerCart = express.Router();

// CART 

routerCart.get("/:cId", async (req, res) =>{
    try{
        const {cId} = req.params;
        const newCart = cart.addCart(product, cId)
    } catch (error){
        res.status(401).send(error)
    }
})