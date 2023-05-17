//@ts-check

import express from "express";
import { routerProducts } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
const app = express ();
const port = 8080; 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ALL MY ENDPOINTS 

app.use("/products", routerProducts);
app.use("/cart", routerCart)

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ooops, page not found!",
        data: {},
    })
})

//APP LISTENER

app.listen(port, ( ) => {
    console.log(`Example app listening on port ${port}`)
})