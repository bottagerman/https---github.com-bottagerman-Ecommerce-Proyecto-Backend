import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { TicketService } from "./ticket.service.js";
import CustomError from "./error/customErrors.js";
import EErros from "./error/enums.js";
import { loggerDev } from "../utils/logger.js";

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();
const ticketService = new TicketService();
export class CartService {
  async createCart() {
    try {
      const cart = await cartManagerMongo.createCart();
      return cart;
    } catch (e) {
      throw new Error("Cant create the cart");
    }
  }
  async getCartId(cid) {
    try {
      const userCart = await cartManagerMongo.getCartId(cid);
      return userCart;
    } catch (e) {
      throw new Error("Cant find this cart, check the id");
    }
  }
  async addProductToCart(cid, pid) {
    try {
      const cart = await cartManagerMongo.getCartId(cid);
      const product = await productManagerMongo.getProductById(pid);
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }

      await cart.save();

      const updatedCart = await cartManagerMongo.getCartId(cid);
      const cartQuantity = updatedCart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      return { cart: updatedCart, cartQuantity };
    } catch (error) {
      throw new Error("Can't add the product to the cart");
    }
  }
  async purchase(cid, uid) {
    try {
      const cart = await this.readAndRender(cid);
      loggerDev.info(cart);

      let totalPrice = 0;
      for (const products of cart.products) {
        loggerDev.debug(products.product.price);
        loggerDev.debug(products.quantity);
        totalPrice += products.product?.price * products.quantity;
      }
      const ticketCode = Math.floor(Math.random() * 900) + 100;

      const date_time = Date.now();

      const ticket = await ticketService.createTicket({
        code: ticketCode,
        date_time: date_time,
        amount: totalPrice,
        purchaser: uid,
      });

      await cartManagerMongo.deleteAllProductsFromCart(cid);

      return ticket;
    } catch (error) {
      // Maneja los errores apropiadamente
      throw new Error("Error al finalizar la compra");
    }
  }
  async readAndRender(cid) {
    const cart = await cartManagerMongo.readAndRender(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }
  async purchase(cid, uid) {
    try {
      const cart = await this.readAndRender(cid);
      loggerDev.info(cart);

      let totalPrice = 0;
      for (const products of cart.products) {
        loggerDev.debug(products.product.price);
        loggerDev.debug(products.quantity);
        totalPrice += products.product?.price * products.quantity;
      }
      loggerDev.info(totalPrice)
      const ticketCode = Math.floor(Math.random() * 900) + 100;

      const date_time = Date.now();

      const ticket = await ticketService.createTicket({
        code: ticketCode,
        date_time: date_time,
        amount: totalPrice,
        purchaser: uid,
      });

      await cartManagerMongo.deleteAllProductsFromCart(cid);

      return ticket;
    } catch (error) {
      // Maneja los errores apropiadamente
      throw new Error("Error al finalizar la compra");
    }
  }
  async deleteProduct(cid, pid) {
    try {
      const cart = await cartManagerMongo.getCartId(cid);
      if (!cart) {
        throw new Error("cart not found");
      }
      const product = cart.products
        .map((product) => product.product.toString())
        .indexOf(pid);

      if (product !== -1) {
        cart.products.splice(product, 1);
      } else {
        loggerDev.error("Product not found");
      }
      const updatedCart = await cartManagerMongo.deleteProductFromCart(
        cid,
        product
      );
      return updatedCart;
    } catch (error) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause: "Error deleting this product of cart",
        message: "Error deleting the product of cart, check out the function",
        code: EErros.DATABASES_CONNECTION_ERROR,
      });
    }
  }
}
