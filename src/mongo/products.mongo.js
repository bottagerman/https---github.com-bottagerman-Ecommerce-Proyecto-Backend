import { productsModel } from "../DAO/models/products.models.js";
import CustomError from "../service/error/customErrors.js";
import EErros from "../service/error/enums.js";
import { loggerDev } from "../utils/logger.js";

export class ProductManagerMongo {
  constructor() {}

  #validateStringField(key, product) {
    if (!product[key]) {
      throw CustomError.createError({
        name: "ERROR-CREATE",
        cause: "Error theres not key",
        message: "Not key of the product",
        code: EErros.INVALID_TYPES_ERROR,
      });
    } else if (
      product[key] === "" ||
      product[key] === undefined ||
      product[key] === null ||
      typeof product[key] !== "string"
    ) {
      throw CustomError.createError({
        name: "ERROR-CREATE",
        cause: "Error theres not key",
        message: "Invalid key of the product",
        code: EErros.INVALID_TYPES_ERROR,
      });
    } else {
      return true;
    }
  }

  #validateNumberField(key, product) {
    if (product[key] === undefined) {
      throw CustomError.createError({
        name: "ERROR-CREATE",
        cause: "Error theres not key",
        message: "Invalid key of the product",
        code: EErros.INVALID_TYPES_ERROR,
      });
    } else if (
      product[key] === NaN ||
      product[key] === null ||
      product[key] < 0
    ) {
      throw CustomError.createError({
        name: "ERROR-CREATE",
        cause: "Error theres not key",
        message: "Invalid key of the product",
        code: EErros.INVALID_TYPES_ERROR,
      });
    } else {
      return true;
    }
  }

  addProduct(addedProduct) {
    return new Promise((resolve, reject) => {
      const product = {
        name: addedProduct.name,
        description: addedProduct.description,
        price: addedProduct.price,
        stock: addedProduct.stock,
        thumbnails: addedProduct.thumbnails,
        status: true,
        code: addedProduct.code,
        category: addedProduct.category,
      };

      productsModel
        .create(product)
        .then((newProduct) => {
          resolve(newProduct);
        })
        .catch((error) => {
          if (error.code === 11000) {
            loggerDev.error(error);
            reject(
              CustomError.createError({
                name: "ERROR-CREATE",
                cause: "Error creating the product, check the code",
                message: "Check the code of the products, theres an error",
                code: EErros.INVALID_TYPES_ERROR,
              })
            );
          } else {
            reject(error);
          }
        });
    });
  }

  async getProductsLimit({ limit = 10, page, sort, query }) {
    const allProductsLimit = await productsModel.paginate(
      {},
      { page: page || 1, limit: limit || 10, sort: sort }
    );
    return allProductsLimit;
  }

  async getProducts() {
    const allProducts = await productsModel.find();
    return allProducts;
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      productsModel
        .findById(id)
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(
              CustomError.createError({
                name: "ERROR-CREATE",
                cause: "Error theres not product",
                message: "Product not found",
                code: EErros.INVALID_TYPES_ERROR,
              })
            );
          }
        })
        .catch((error) => {
          reject(
            CustomError.createError({
              name: "ERROR-CREATE",
              cause: "Error theres not product",
              message: "Product not found",
              code: EErros.INVALID_TYPES_ERROR,
            })
          );
        });
    });
  }

  updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      if (product.code) {
        reject(
          CustomError.createError({
            name: "ERROR-UPDATE",
            cause: "You cant change the code field",
            message: "Cant change the code field",
            code: EErros.INVALID_TYPES_ERROR,
          })
        );
      }

      let newProductFields = Object.keys(product);

      newProductFields.forEach((field) => {
        if (
          field === "name" ||
          field === "description" ||
          field === "price" ||
          field === "thumbnails" ||
          field === "stock"
        ) {
          if (
            field === "name" ||
            field === "description" ||
            field === "thumbnails"
          ) {
            this.#validateStringField(field, product);
          }

          if (field === "price" || field === "stock") {
            this.#validateNumberField(field, product);
          }
        } else {
          reject(
            CustomError.createError({
              name: "ERROR-UPDATE",
              cause: "Check out the fields that you want to change, theres something wrong",
              message: "Check the fields",
              code: EErros.INVALID_TYPES_ERROR,
            })
          );
        }
      });

      productsModel
        .findByIdAndUpdate(id, product, { new: true })
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(   CustomError.createError({
            name: "ERROR-FIND",
            cause: "Error finding and updating the product",
            message: "Error finding the product, check the code please",
            code: EErros.INVALID_TYPES_ERROR,
          }));
          }
        })
        .catch((e) => {
          reject(CustomError.createError({
            name: "ERROR-FIND",
            cause: "Error finding and updating the product",
            message: "Error finding the product, check the code please",
            code: EErros.INVALID_TYPES_ERROR,
          }));
        });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      productsModel
        .findByIdAndDelete(id)
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(CustomError.createError({
            name: "ERROR-DELETE",
            cause: "You cant delete the product.",
            message: "Cant delete the product.",
            code: EErros.INVALID_TYPES_ERROR,
          }));
        });
    });
  }
}
