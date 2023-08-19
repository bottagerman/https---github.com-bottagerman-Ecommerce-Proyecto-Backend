import { CartManagerMongo } from "../mongo/cart.mongo.js";
import { ProductManagerMongo } from "../mongo/products.mongo.js";

const cartManagerMongo = new CartManagerMongo();
const productManagerMongo = new ProductManagerMongo();

export class CartService {
  async addProductToCart(cartId, productId) {
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
            product: productToAdd,
            quantity: 1,
          });
        }
      }
      console.log(cart)
      await cart.save();
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
