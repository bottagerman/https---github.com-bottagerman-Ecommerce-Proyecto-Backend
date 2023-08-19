import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { userModel } from "../mongo/user.mongo.js";
import { CartService } from "../service/cart.service.js";
import EErros from "../service/error/enums.js";
import CustomError from "../service/error/customErrors.js";

const cartManagerMongo = new CartManagerMongo();
const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const userCart = await cartManagerMongo.createCart();
    console.log(userCart._id.toString());
    req.session.user.cart = userCart._id;
    res.redirect(`/views/carts/${userCart._id}`);
  } catch (error) {
    CustomError.createError({
      name: "ERROR-CREATE",
      cause: "Error creating the cart",
      message: "Error creating the cart",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManagerMongo.getCartId(cartId);
    res.render("cartDetail", { cartId: cart._id, cart: cart });
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
    const idCart = req.session.user.cart;
    const idProduct = req.params.pid;
    console.log(idProduct);
    await cartService.addProductToCart(idCart, idProduct);

    let cartUpdated = await cartManagerMongo.getCartId(idCart);
    const myCart = cartUpdated.products.map((prod) => prod.toJSON());

    res.render("cartDetail", { cart: myCart });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Error adding the product to the cart, check if cid or pid are right!",
      message: "Error adding the product to the cart, check if cid or pid are right!",
      code: EErros.DATABASES_READ_ERROR,
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
    CustomError.createError({
      name: "ERROR-DELETE",
      cause: "Error deleting the product from the cart, check if exist!",
      message: "Error deleting the product from the cart, check if exist!",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};
