import { CartManagerMongo } from "../mongo/cart.mongo.js";
import {userModel} from "../mongo/user.mongo.js"
import { CartService } from "../service/cart.service.js";

const cartManagerMongo = new CartManagerMongo();
const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    req.session.user.cart = userCart._id
  res.render("cartDetail", {cart: userCart})
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error creating cart",
      error: error.message,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManagerMongo.getCartId(cartId);
    res.render("cartDetail", {cart})
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Cart not found",
      error: error.message,
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.session.user.cart;
    const productId = req.params.pid;

    if (!cartId) {
      return res.redirect(`/views/carts/${cartId}`);

    }

    const updatedCart = await cartService.addProductToCart(cartId, productId);

    res.render("cartDetail", { cart: updatedCart });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const updatedCart = await cartService.removeProductFromCart(
      cartId,
      productId
    );

    res.status(200).json({
      status: "success",
      message: "Product removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};
export const createOrRedirectToCart = async (req, res) => {
  try {
    const userId = req.session.user._id; // Obtén el ID de usuario de la sesión
    const userCartId = req.session.user.cart; // Obtén el ID de carrito de la sesión

    if (userCartId) {
      // Si el usuario ya tiene un carrito, redirige al detalle del carrito
      return res.redirect(`/views/carts/${userCartId}`);
    } else {
      // Si el usuario no tiene un carrito, crea uno y asócialo al usuario
      const newCart = await cartManagerMongo.createCart();
      // Asocia el ID del nuevo carrito al usuario
      await userModel.updateUserCart(userId, newCart._id);

      req.session.user.cart = newCart._id; // Guarda el ID del carrito en la sesión
      return res.redirect(`/views/carts/${newCart._id}`);
    }
  } catch (error) {
    res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

