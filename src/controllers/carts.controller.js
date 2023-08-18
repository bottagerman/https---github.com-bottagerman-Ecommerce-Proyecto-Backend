import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { userModel } from "../mongo/user.mongo.js";
import { CartService } from "../service/cart.service.js";

const cartManagerMongo = new CartManagerMongo();
const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    console.log(userCart._id.toString());
    req.session.user.cart = userCart._id;
    res.redirect(`/views/carts/${userCart._id}`);
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
    res.render("cartDetail", { cartId: cart._id, cart: cart });
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
    const idCart = req.session.user.cart;
    const idProduct = req.params._id;
    console.log(idProduct)
    await cartService.addProductToCart(idCart, idProduct);

    let cartUpdated = await cartManagerMongo.getCartId(idCart);

    res.render("cartDetail", { cart: cartUpdated });
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
