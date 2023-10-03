import { cartModel } from "../DAO/models/cart.models.js";
import { ProductManagerMongo } from "./products.mongo.js";
import CustomError from "../service/error/customErrors.js";
import EErros from "../service/error/enums.js";

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
          const customError = CustomError.createError({
            name: "ERROR-CREATE",
            cause: "Error creating cart",
            message: "Error creating a cart",
            code: EErros.INVALID_TYPES_ERROR,
          });
          reject(customError);
        });
    });
  }

  async getCartId(_id) {
    try {
      const cart = await cartModel.findOne({ _id });

      return cart;
    } catch (error) {
      CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error finding the cart",
        message: "Error finding a cart",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);

      if (!productToAdd) {
        CustomError.createError({
          name: "ERROR-FIND",
          cause: "Error there's not product to add ",
          message: "Add the product before searching for a product",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.product": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartModel.findByIdAndUpdate(cId, {
          $push: { products: { product: productToAdd._id, quantity: 1 } },
        });
      }

      return cartModel.findById(cId);
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error there's not cart to add the product ",
        message: "Check if cart exists before trying to add a product",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(pId);

      if (!productToDelete) {
        CustomError.createError({
          name: "ERROR-FIND",
          cause: "Error there's not product to delete ",
          message: "The cart its empty!",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $inc: { "products.$.quantity": -1 },
        }
      );

      let findIndexArray = cart.products.findIndex(
        (product) => product.product.toString() === pId
      );

      if (cart.products[findIndexArray].quantity <= 1) {
        await cartModel.findByIdAndUpdate(cId, {
          $pull: { products: { product: productToDelete._id } },
        });
      }

      return cartModel.findById(cId);
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error there's not product to delete ",
        message: "The cart its empty!",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async deleteProductFromCartComplete(cId, pId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(pId);

      if (!productToDelete) {
        CustomError.createError({
          name: "ERROR-FIND",
          cause: "Error there's not product to delete ",
          message: "The cart its empty!",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $pull: { products: { product: productToDelete._id } },
        }
      );

      return cartModel.findById(cId);
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error there's not product to delete ",
        message: "The cart its empty!",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async updateQuantityProductFromCart(cId, pId, quantity) {
    try {
      const productToUpdate = await productManagerMongo.getProductById(pId);

      if (!productToUpdate) {
        CustomError.createError({
          name: "ERROR-FIND",
          cause: "Error there's not product to delete ",
          message: "The cart its empty!",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }

      if (
        quantity.quantity < 0 ||
        quantity.quantity === 0 ||
        quantity.quantity === null ||
        quantity.quantity === undefined ||
        typeof quantity.quantity === "string"
      ) {
        throw new Error("Quantity must be a positive number");
      }

      let cart = await cartModel.findOneAndUpdate(
        { _id: cId, "products.product": productToUpdate._id },
        {
          $set: { "products.$.quantity": quantity.quantity },
        }
      );

      return (
        cartModel.findById(cId) + ` QUANTITY updated to ${quantity.quantity}`
      );
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error there's not product to delete ",
        message: "The cart its empty!",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async updateCartArray(cId, productArray) {
    try {
      let newCartProducts = productArray.products.map((product) => {
        return {
          product: product._id,
          quantity: product.quantity,
        };
      });

      for (let i = 0; i < newCartProducts.length; i++) {
        if (
          newCartProducts[i].quantity < 0 ||
          newCartProducts[i].quantity === 0 ||
          newCartProducts[i].quantity === null ||
          newCartProducts[i].quantity === undefined ||
          typeof newCartProducts[i].quantity === "string"
        ) {
          newCartProducts[i].quantity = 1;
        }
      }

      let cart = await cartModel.findByIdAndUpdate(cId, {
        products: newCartProducts,
      });

      return cartModel.findById(cId);
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-UPDATE",
        cause: "Error there's not array to update ",
        message: "The cart its empty!",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async deleteAllProductsFromCart(cId) {
    try {
      await cartModel.findByIdAndUpdate(cId, { products: [] });
      return "Cart empty";
    } catch (error) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Error there's not products in this cart to delete ",
        message: "The cart its empty!",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
  async readAndRender(cartId) {
		try {
			const cart = await cartModel.findById(cartId).populate("products.product");
			return cart;
		} catch (e) {
			logger.info(e);
		}
	}
}
