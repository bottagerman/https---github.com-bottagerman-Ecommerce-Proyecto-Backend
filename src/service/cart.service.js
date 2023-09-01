import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { ticketModel } from "../DAO/models/ticket.model.js";
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
  async purchase(cartId, userId) {
    try {
      // Obtén el carrito por su ID
      const cart = await cartManagerMongo.getCartId(cartId);

      // Calcula el precio total sumando los precios de los productos en el carrito
      let totalPrice = 0;
      for (const product of cart.products) {
        totalPrice += product.detail.price * product.quantity;
      }

      // Crea un nuevo ticket
      const ticket = await ticketModel.create({
        code: generateTicketCode(), // Genera un código de ticket único
        date_time: Date.now(),
        amount: totalPrice,
        purchaser: userId, // El ID del usuario que realiza la compra
      });

      // Elimina el carrito de la colección "carts"
      await cartManagerMongo.deleteAllProductsFromCart(cartId);

      return ticket;
    } catch (error) {
      // Maneja los errores apropiadamente
      throw new Error("Error al finalizar la compra");
    }
  }
}
