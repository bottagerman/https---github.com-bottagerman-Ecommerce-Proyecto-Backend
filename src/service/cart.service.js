import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { TicketService } from "./ticket.service.js";
import CustomError from "./error/customErrors.js";
import EErros from "./error/enums.js";

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();
const ticketService = new TicketService();
export class CartService {
  async addProductToCart(cid, pid) {
    try {
      const cart = await cartManagerMongo.getCartId(cid);
      const product = await productManagerMongo.getProductById(pid);

      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }

      const existingProduct = cart.products.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }

      await cart.save();

      const updatedCart = await this.getCartId(cid);
      const cartQuantity = updatedCart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      return { cart: updatedCart, cartQuantity };
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
      const cart = await cartManagerMongo.getCartId(cartId);

      let totalPrice = 0;
      for (const product of cart.products) {
        totalPrice += product.detail.price * product.quantity;
      }

      const ticketCode = Math.floor(Math.random() * 900) + 100;

      const date_time = Date.now();

      const ticket = await ticketService.createTicket({
        code: ticketCode,
        date_time: date_time,
        amount: totalPrice,
        purchaser: userId,
      });

      await cartManagerMongo.deleteAllProductsFromCart(cartId);

      return ticket;
    } catch (error) {
      // Maneja los errores apropiadamente
      throw new Error("Error al finalizar la compra");
    }
  }
  async readAndRender(cartId) {
    const cart = await cartManagerMongo.readAndRender(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }
}
