import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { userModel } from "../mongo/user.mongo.js";
import { CartService } from "../service/cart.service.js";
import * as productController from "../controllers/products.controller.js";
import EErros from "../service/error/enums.js";
import CustomError from "../service/error/customErrors.js";
import { loggerDev } from "../utils/logger.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";

const cartManagerMongo = new CartManagerMongo();
const cartService = new CartService();
const productManagerMongo = new ProductManagerMongo();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    loggerDev.info(userCart._id.toString());
    req.session.user.cart = userCart._id;
    res.redirect(`/views/carts/${userCart._id}`);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating the cart",
      error: error.message,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManagerMongo.getCartId(cartId);
    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Error finding the cart by the id, check if the id exist!",
      message: "Error finding the cart by the id, check if the id exist!",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartUpdated = await cartService.addProductToCart(cid, pid);

    loggerDev.info(cartUpdated);
    res.status(200).json({ status: "success", data: cartUpdated });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const readAndRender = async (req, res) => {
  try {
    const cartId = req.session.user.cart;
    const cart = await cartService.readAndRender(cartId);
    const title = "Products in the cart";
    const { firstName, role, email } = req.session.user;
    const myCart = cart.products.map((doc) => doc.toObject());
    res.status(200).render("cartProducts", {
      myCart,
      cartId,
      title,
      firstName,
      role,
      email,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const updatedCart = await cartService.deleteProduct(cid, pid);

    loggerDev.info(updatedCart);
    res.status(200).json({
      status: "success",
      message: "product deleted successfully",
      data: updatedCart,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-DELETE",
      cause: "Error deleting the product from the cart, check if exist!",
      message: "Error deleting the product from the cart, check if exist!",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const userId = req.session.user._id; // Obtén el ID del usuario actual
    const cartId = req.session.user.cart; // Obtén el ID del carrito actual

    const ticket = await cartService.purchase(cartId, userId);

    // Puedes redirigir a una página de confirmación de compra o hacer lo que desees con el ticket aquí

    res.status(200).json({
      status: "success",
      message: "Compra realizada con éxito",
      ticket: ticket,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al finalizar la compra",
      error: error.message,
    });
  }
};
