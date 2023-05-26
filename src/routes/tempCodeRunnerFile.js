
// GET PRODUCTS BY ID
routerProducts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await product.getProductById(id);
    if (!productId) {
      res
        .status(404)
        .send({ status: "Error", msg: "Oooops! Product not found" });
    } else {
      res.status(200).send({ status: "success", data: productId });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// DELETE PRODUCT
routerProducts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.deleteProduct(id);
    if (!deletedProduct) {
      res
        .status(404)
        .send({ status: "Error", msg: "Oooops! Product not found" });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Product deleted successfully",
        data: deletedProduct,
      });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// CHANGE PRODUCT FIELD
routerProducts.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedProduct = product.updateProduct(id, newData);
    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        msg: "Oooops! Product not found",
        data: {},
      });
    }
    return res.status(200).json({
      status: "success",
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
      data: {},
    });
  }
});


