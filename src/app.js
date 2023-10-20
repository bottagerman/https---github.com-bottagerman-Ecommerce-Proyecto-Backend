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
import errorHandler from "./middlewares/error.js";
import { loggerDev } from "./utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { routerTicket } from "./routes/ticket.router.js";

const app = express();
const port = 8080;
dotenv.config()


//CONNECTION TO THE MONGO DB
connectMongo();

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

//SWAGGER CONFIGURATION

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",

    info: {
      title: "Documentation Signature Guitar Shop!",

      description: "E-commerce de guitarras premium",
    },
  },

  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
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
app.use(express.static('public'));

// ALL MY API ENDPOINTS
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);
app.use("/api/users", routerUsers);
app.use("/api/sessions", routerLogin);
app.use("/api/tickets", routerTicket)

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
  });
});

//ERROR MIDDLEWARE
app.use(errorHandler);

httpServer.listen(port, () => {
  loggerDev.info(`Example app listening on port ${port}`);
});
