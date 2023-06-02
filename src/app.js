import express from "express";
import handlebars from "express-handlebars";
import { product } from "./handlers/productManger.js";
import { routerProducts } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { routerProductsView } from "./routes/products.view.router.js";
import { __dirname } from "./utils.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 8080;
const httpServer = createServer(app);
const socketServer = new Server(httpServer);

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

// ALL MY HTML ENDPOINTS
app.use("/views/products", routerProductsView);

// GLOBAL ENDPOINT
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Oops, page not found!",
    data: {},
  });
});

socketServer.on("connection", (socket) => {
  const updatedProducts = product.getUpdatedProducts();
  if (updatedProducts.length > 0) {
    socket.emit("products", updatedProducts);
  }

  socket.on("addProduct", (data) => {
    product.addProduct(
      data.title,
      data.description,
      data.price,
      data.category,
      data.thumbnail,
      data.stock,
      data.code
    );
    const updatedProducts = product.getProducts();
    socketServer.emit("products", updatedProducts);
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
