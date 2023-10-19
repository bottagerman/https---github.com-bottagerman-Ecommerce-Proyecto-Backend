import { ProductManagerMongo } from "../mongo/products.mongo.js";
import { loggerDev } from "../utils/logger.js";

const productModel = new ProductManagerMongo();

export class ProductService {
  async createNewProduct(
    name,
    description,
    price,
    stock,
    thumbnails,
    status,
    code,
    category
  ) {
    try {
      const newProduct = await productModel.addProduct(
        name,
        description,
        price,
        stock,
        thumbnails,
        status,
        code,
        category
      );
      return newProduct;
    } catch (e) {
      loggerDev.error(e);
      throw new Error("Error creating product");
    }
  }
  async getAllProducts() {
    try {
      const allProducts = await productModel.getProducts();
      return allProducts;
    } catch (e) {
      throw new Error("cant find all the products");
    }
  }
  async getProductById(id) {
    try {
      const product = await productModel.getProductById(id);
      return product;
    } catch (e) {
      throw new Error("cant find  the products");
    }
  }
  async getProductsLimit({ limit, sort }) {
    try {
      const ourProducts = await productModel.getProductsLimit(limit, sort);
      return ourProducts;
    } catch (e) {
      throw new Error("Theres not products");
    }
  }
  async deleteProduct(id) {
    try {
      const productToDelete = await productModel.deleteProduct(id);
      return productToDelete;
    } catch (e) {
      throw new Error("Can't delete this product");
    }
  }
}
