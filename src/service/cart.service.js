import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import CustomError from "./error/customErrors.js";

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();

export class CartService {
  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartManagerMongo.getCartId({ _id: cartId });

      if (cart) {
        const product = cart.products.find(
          (product) => product.product.toString() === productId
        );
        if (product) {
          product.quantity += 1;
        } else {
          const productToAdd = await productManagerMongo.getProductById(
            productId
          );

          if (productToAdd) {
            cart.products.push({
              product: productToAdd._id,
              detail: productToAdd,
              quantity: 1,
            });
          }
        }
        await cart.save();
      }
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause: "Error adding the product to cart",
        message: "Error adding the product to cart, check out the function",
        code: EErros.DATABASES_CONNECTION_ERROR,
      });
    }
  }
}
