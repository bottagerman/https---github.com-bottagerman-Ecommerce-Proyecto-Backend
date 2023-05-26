// CART MANAGER
import fs from "fs";

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
  