import { productsModel } from "../DAO/models/products.models.js";

export class ProductManagerMongo {
  constructor() {}

  #validateStringField(key, product) {
    console.log(product[key]);
    if (!product[key]) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === "" ||
      product[key] === undefined ||
      product[key] === null ||
      typeof product[key] !== "string"
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
    } else {
      return true;
    }
  }

  #validateNumberField(key, product) {
    if (product[key] === undefined) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === NaN ||
      product[key] === null ||
      product[key] < 0
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
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
            console.log(error);
            reject(new Error("Code field already exist in the db"));
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
      let foundProduct = productsModel
        .findById(id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(new Error("Product not found"));
        });
    });
  }

  updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      if (product.code) {
        reject(new Error("Code can't be modified"));
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
          reject(new Error("Product field not valid"));
        }
      });

      productsModel
        .findByIdAndUpdate(id, product, { new: true })
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Product not found"));
          }
        })
        .catch((error) => {
          reject(new Error("Product not found"));
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
        .catch((error) => {
          reject(error);
        });
    });
  }
}
