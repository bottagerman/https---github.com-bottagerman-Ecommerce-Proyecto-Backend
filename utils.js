//@ts-check

import fs from "fs";

//PRODUCT MANAGER

export class ProductManager {
  #path;
  constructor(path) {
    this.products = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)) fs.writeFileSync(this.#path, "[]");
  }

  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    console.log(this.products);
    return this.products;
  }
  #generateId() {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    let newId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod.id > newId) {
        newId = prod.id;
      }
    }
    return ++newId;
  }
  getProductById(id) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));

    const productFound = this.products.find((p) => p.id === id);
    if (!productFound) {
      return undefined;
    } else {
      return productFound;
    }
  }
  #getProductByCode(code) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    const existInArray = this.products.find((p) => p.code === code);
    if (existInArray) {
      console.log("Product not found");
      return true;
    } else {
      return false;
    }
  }

  addProduct(title, description, price, category, thumbnail, stock, code) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !thumbnail ||
      !stock ||
      !code ||
      this.#getProductByCode(code)
    ) {
      return console.log(
        "ERROR!, you can't left a field without complete or repeat the code, please try again"
      );
    } else {
      let newProduct = {
        title,
        description,
        price,
        category,
        thumbnail,
        stock,
        code,
        id: this.#generateId(),
      };
      this.products = [...this.products, newProduct];
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
    }
  }
  writeDataToFile() {
    fs.writeFileSync(this.#path, JSON.stringify(this.products));
  }

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    const productExists = this.products.find((p) => p.id === id);
    if (productExists) {
      const deletedProduct = this.products.find((p) => p.id === id);
      this.products.splice(this.products.indexOf(deletedProduct), 1);
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return deletedProduct;
    } else {
      return undefined;
    }
  }

  updateProduct(id, newData) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const updatedProduct = {
      ...this.products[index],
      ...newData,
      id: this.products[index].id,
    };

    this.products[index] = updatedProduct;
    fs.writeFileSync(this.#path, JSON.stringify(this.products));

    return updatedProduct;
  }
}
export const product = new ProductManager("./products.json");


// CART MANAGER

class CartManager {
  #path;
  constructor(path) {
    this.cart = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)) fs.writeFileSync(this.#path, "[]");
  }
  #generateId() {
    this.cart = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    let newId = 0;
    for (let i = 0; i < this.cart.length; i++) {
      const cart = this.cart[i];
      if (cart.id > newId) {
        newId = cart.id;
      }
    }
    return ++newId;
  }
  addCart(product, cId) {
    this.cart = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    const id = { id: this.#generateId };
    const newProductCart = {
      product: product,
    };
    this.cart.push(newProductCart, cId);
    fs.writeFileSync(this.#path, JSON.stringify(this.cart));
  }
}
export const cart = new CartManager("./cart.json");
