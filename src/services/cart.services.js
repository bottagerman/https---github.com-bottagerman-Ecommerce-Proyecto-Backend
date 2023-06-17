import { cartModel } from "../DAO/models/cart.models.js";
import { ProductManagerMongo } from "./products.services.js";

const productManagerMongo = new ProductManagerMongo();

export class CartManagerMongo {
  constructor() {}

  createCart() {
    return new Promise((resolve, reject) => {
      cartModel
        .create({ products: [] })
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  getCartId(id) {
    return new Promise((resolve, reject) => {
      cartModel
        .findById(id)
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error("Cart not found"));
        });
    });
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);
      console.log(productToAdd);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.pId": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartModel.findByIdAndUpdate(cId, {
          $push: { products: { pId: productToAdd._id, quantity: 1 } },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProductCart(cId, pId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.pId": productToDelete._id },
        {
          $inc: { "products.$.quantity": -1 },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsCart(cId) {
    try {
      await cartModel.findByIdAndUpdate(cId, { products: [] });
    } catch (error) {
      throw new Error(error);
    }
  }
}
