import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();

export class CartService {
  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartManagerMongo.getCartId(cartId);
      const product = await productManagerMongo.getProductById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // ... Lógica para agregar el producto al carrito y actualizar el stock ...

      return cart; // Retorna el carrito actualizado
    } catch (error) {
      throw new Error("Error adding product to cart: " + error.message);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartManagerMongo.getCartId(cartId);

      // ... Lógica para remover el producto del carrito y actualizar el stock ...

      return cart; // Retorna el carrito actualizado
    } catch (error) {
      throw new Error("Error removing product from cart: " + error.message);
    }
  }

  // ... Otros métodos de servicio relacionados con el carrito ...
}
