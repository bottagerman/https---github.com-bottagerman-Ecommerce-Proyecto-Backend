import { productModel } from "../mongo/products.mongo";
import { loggerDev } from "../utils/logger";

class ProductService {
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
      return newProduct
    } catch (e) {
      loggerDev.error(e);
      throw new Error("Error creating product");
    }
  }
  async productDiscount(){

  }
}
