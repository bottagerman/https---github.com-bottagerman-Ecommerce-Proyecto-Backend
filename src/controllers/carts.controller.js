import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { CartService } from "../service/cart.service.js";

const cartManagerMongo = new CartManagerMongo();
const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();

  res.render("cartDetail", userCart)
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
    res.render("profile", cartId)
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
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Check if cart exists, if not, create it
    let cart = await cartManagerMongo.getCartId(cartId);
    if (!cart) {
      cart = await cartManagerMongo.createCart();
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
