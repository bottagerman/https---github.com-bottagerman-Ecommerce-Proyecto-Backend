//@ts-check

import fs from "fs";

//PRODUCT MANAGER

class ProductManager {
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

    const productFound = this.products.find((p) => p.id === Number(id));
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

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (this.products.find((p) => p.id === id)) {
      this.products.splice(
        this.products.indexOf(this.products.find((p) => p.id === id)),
        1
      );
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return console.log("Product deleted successfully");
    } else {
      return console.log("Product not found");
    }
  }

  updateProduct(id, key, value) {
    if (key == id) {
      return console.log("You cannot change the id field");
    } else if (this.products.find((p) => p.id === id)) {
      const found = this.products.find((p) => p.id === id);
      found[key] = value;
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return console.log("Updated product", found);
    } else {
      return console.log("Product not found ");
    }
  }
}
export const product = new ProductManager("./products.json");

product.addProduct(
  "Gibson Les Paul",
  "Gibson Les Paul signature 1990",
  7000,
  "no iamge",
  2,
  "aa23"
);
product.addProduct(
  "Fender Stratocaster",
  "Fender Stratocaster 69's relic",
  8000,
  "no image",
  1,
  "al23"
);
product.addProduct(
  "Kramer Baretta",
  "Kramer Baretta Pappo's signature",
  3500,
  "guitar",
  "no image",
  3,
  "ap200"
);

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
    const cId = {id: this.#generateId}
    const newProductCart = {
        product: product,
      };
      this.cart.push(newProductCart, cId)
      fs.writeFileSync(this.#path, JSON.stringify(this.cart));
    }
}
export const cart = new CartManager("./cart.json")
