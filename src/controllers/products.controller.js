import { ProductManagerMongo } from "../mongo/products.mongo.js";

const productService = new ProductManagerMongo();

export const getProductById = async (req, res) => {
  try {
    const {id} = req.params
    const product = await productService.getProductById(id);
    return res.status(200).json({
      status: "success",
      msg: "product selected",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
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
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
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
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    await productService.deleteProduct(pid);
    return res.status(200).json({
      status: "success",
      msg: "product deleted",
      data: {},
    });
  } catch (error) {
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
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
    console.log(error);
    return res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
