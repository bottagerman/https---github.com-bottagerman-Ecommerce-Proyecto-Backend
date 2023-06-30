import express from "express";
import handlebars from "express-handlebars";
//import { product } from "./DAO/handlers/productManger.js";
import { routerProducts } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { routerUsers } from "./routes/users.router.js";
import { routerProductsView } from "./routes/products.view.router.js";
import { __dirname } from "./path.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectMongo } from "./utils/connections.js";
import { routerCartViews } from "./routes/cart.view.js";
import session from "express-session";

const app = express();
const port = 8080;

//CONNECTION TO THE MONGO DB
connectMongo();

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "secret-coder", resave: true, saveUninitialized: true })
);

// HANDLEBARS ENGINE CONFIGURATION
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// PUBLIC FILES
app.use(express.static(__dirname + "/public"));

// ALL MY API ENDPOINTS
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);
app.use("/api/users", routerUsers);

// ALL MY HTML ENDPOINTS
app.use("/views/products", routerProductsView);
app.use("/views/cart", routerCartViews);

app.get("/session", (req, res) => {
  if (req.session.cont) {
    req.session.cont++;
    res.send("nos visitaste " + req.session.cont);
  } else {
    req.session.cont = 1;
    res.send("nos visitaste " + 1);
  }
});

app.get("/show-session", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  res.send("ver la consola");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR!", body: err });
    }
    res.send("Logout OK!");
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = false;
  res.send("login success!");
});

app.get("/profile", (req, res) => {
  res.send("Profile data" + JSON.stringify(req.session))
})

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
