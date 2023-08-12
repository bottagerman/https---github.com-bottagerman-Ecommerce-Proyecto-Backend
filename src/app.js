import express from "express";
import handlebars from "express-handlebars";
import { routerProducts } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { routerUsers } from "./routes/users.router.js";
import { routerProductsView } from "./routes/products.view.router.js";
import { routerLogin } from "./routes/login.router.js";
import { routerCartViews } from "./routes/cart.view.js";
import { routerViews } from "./routes/views.router.js";
import { __dirname } from "./path.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectMongo } from "./utils/connections.js";
import passport from "passport";
import { iniPassport } from "./config/passport.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const port = 8080;

//CONNECTION TO THE MONGO DB
connectMongo();

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bottagerman:W6CkrlukQm3hzgsn@cluster0.zsm3uly.mongodb.net/coder?authSource=admin&replicaSet=atlas-ptw4gy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
      ttl: 86400 * 7,
    }),
    secret: "a-true-secret",
    resave: true,
    saveUninitialized: true,
  })
);
//PASSPORT INIT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// HANDLEBARS ENGINE CONFIGURATION
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// PUBLIC FILES
app.use(express.static("public"));

// ALL MY API ENDPOINTS
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);
app.use("/api/users", routerUsers);
app.use("/api/sessions", routerLogin);


// ALL MY HTML ENDPOINTS
app.use("/views/products", routerProductsView);
app.use("/views/carts", routerCartViews);
app.use("/", routerViews);

// GLOBAL ENDPOINT
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Oops, page not found!",
    data: {},
  });ñ
});

// socketServer.on("connection", (socket) => {
//   const updatedProducts = product.getUpdatedProducts();
//   if (updatedProducts.length > 0) {
//     socket.emit("products", updatedProducts);
//   }

//   socket.on("addProduct", (data) => {
//     product.addProduct(
//       data.title,
//       data.description,
//       data.price,
//       data.category,
//       data.thumbnail,
//       data.stock,
//       data.code
//     );
//     const updatedProducts = product.getProducts();
//     socketServer.emit("products", updatedProducts);
//   });
// });

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
