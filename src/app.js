//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { routerProducts } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { routerProductsView } from "./routes/products.view.router.js";
import { __dirname } from "../utils.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// HANDLEBARS ENGINE CONFIGURATION
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// PUBLIC FILES 
app.use(express.static(__dirname + "/public"));

// ALL MY API ENDPOINTS

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

// ALL MY HTLM ENDPOINTS 

app.use("/view/products", routerProductsView);

// GLOBAL ENDPOINT

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Ooops, page not found!",
    data: {},
  });
});

//APP LISTENER

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
