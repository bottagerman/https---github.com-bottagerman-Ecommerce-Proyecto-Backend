import { productModel } from "../mongo/products.mongo";

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
      console.log(e);
      throw new Error("Error creating product");
    }
  }
}
