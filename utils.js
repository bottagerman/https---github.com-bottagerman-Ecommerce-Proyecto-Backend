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
    this.#path = path;
    this.cart = [];
    this.initializeCart();
  }

  initializeCart() {
    if (!fs.existsSync(this.#path)) {
      fs.writeFileSync(this.#path, JSON.stringify([]));
    } else {
      const cartData = fs.readFileSync(this.#path, "utf-8");
      this.cart = JSON.parse(cartData);
    }
  }

  #generateId() {
    let newId = 0;
    for (let i = 0; i < this.cart.length; i++) {
      const cart = this.cart[i];
      if (cart.id > newId) {
        newId = cart.id;
      }
    }
    return ++newId;
  }

  getCartById(id) {
    const cartFound = this.cart.find((cart) => cart.id === Number(id));
    if (!cartFound) {
      return undefined;
    } else {
      return cartFound;
    }
  }

  addCart(product) {
    const cId = this.#generateId();
    const newProductCart = {
      id: cId,
      products: [product],
    };
    this.cart.push(newProductCart);
    this.writeDataToFile();
  }

  async addItemToCart(cartId, productId) {
    try {
      const fileCarts = await fs.promises.readFile(this.#path, "utf-8");
      const fileCartsParse = JSON.parse(fileCarts);
      this.cart = fileCartsParse;

      const allProducts = await product.getProducts();
      const productFound = allProducts.find(
        (product) => product.id === productId
      );
      if (productFound) {
        let findCart = fileCartsParse.find((cart) => cart.id === cartId);

        if (!findCart) {
          this.addCart({});
          findCart = fileCartsParse.find((cart) => cart.id === cartId);
        }

        const foundProductInCart = findCart.products.find(
          (product) => product.idProduct === productId
        );

        if (foundProductInCart) {
          foundProductInCart.quantity++;

          let cartsString = JSON.stringify(this.cart);
          fs.writeFileSync(this.#path, cartsString);
          return true;
        } else {
          const products = {
            idProduct: productId,
            quantity: 1,
          };
          findCart.products.push(products);
          let cartsString = JSON.stringify(this.cart);
          fs.writeFileSync(this.#path, cartsString);
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  writeDataToFile() {
    fs.writeFileSync(this.#path, JSON.stringify(this.cart));
  }
}

export const cart = new CartManager("./cart.json");
