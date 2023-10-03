import { ProductManagerMongo } from "../mongo/products.mongo.js";
import EErros from "../service/error/enums.js";
import CustomError from "../service/error/customErrors.js";
import { CartManagerMongo } from "../mongo/cart.mongo.js";

const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo()

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.status(200).json({
      status: "success",
      msg: "product selected",
      data: product,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Check the id of the product",
      message: "Check the id of the product",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const product = await productService.getProducts();
    return res.status(200).json({
      status: "success",
      msg: "product list",
      data: product,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-FIND",
      cause: "Error finding all the products",
      message: "Error finding all the products",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productService.addProduct(newProduct);
    return res.status(201).json({
      status: "success",
      msg: "product created",
      data: addedProduct,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-CREATE",
      cause: "Error creating a new product",
      message: "Error creating a new product check all the fields",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productIdToDelete = req.body.id;
    await productService.deleteProduct(productIdToDelete);
    return res.status(200).json({
      status: "success",
      msg: "product deleted",
      data: {},
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-DELETE",
      cause: "Error deleting the product, check if the id its right!",
      message: "Error deleting the product, check if the id its right!",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updateProductClient = req.body;
    const updatedProduct = await productService.updateProduct(
      pid,
      updateProductClient
    );
    return res.status(200).json({
      status: "success",
      msg: "product updated",
      data: updatedProduct,
    });
  } catch (error) {
    CustomError.createError({
      name: "ERROR-UPDATE",
      cause: "Error finding or updating the product",
      message: "Error finding or updating the product",
      code: EErros.DATABASES_READ_ERROR,
    });
  }
};
export const getLimitProduct = async (req, res) => {
  const limit = req.query.limit || 10;
  const sort = req.query.sort === "desc" ? "-price" : "price";
  const cart = await cartService.createCart()
  req.session.user.cart = cart._id;
  const allProducts = await productService.getProductsLimit({
    limit,
    sort,
  });
  res.status(200).render("products", {
    allProducts: allProducts.docs.map((product) => ({
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      id: product._id,
      cart: req.session.user.cart,
    })),
    totalPages: allProducts.totalPages,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
    page: allProducts.page,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
  });
};
