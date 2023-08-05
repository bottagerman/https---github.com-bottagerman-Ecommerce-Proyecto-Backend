import { CartManagerMongo } from "../mongo/cart.mongo.js";

const cartManagerMongo = new CartManagerMongo();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    res.status(201).json({
      status: "success",
      message: "Cart created",
      data: userCart,
    });
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
    res.status(200).json({
      status: "success",
      message: "Cart details",
      data: cart,
    });
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
    const cart = await cartManagerMongo.addProductToCart(cartId, productId);
    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};