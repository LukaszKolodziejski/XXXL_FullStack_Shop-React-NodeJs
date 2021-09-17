/**** 
Version with fs - File System
****/

import fs from "fs";
import path from "path";
import { callbackify } from "util";

// const fs = require("fs");
// const path = require("path");

const filePath = path.join(__dirname, "../data/cart.json");

export default class Cart {
  static addProduct(id, productPrice) {
    //Fetch previous cart
    fs.readFile(filePath, (err, fileContent) => {
      // let cart = { products: [], totalPrice: 0, amount: 0 };
      let cart = { products: [], totalPrice: 0 };
      // { products: [], totalPrice: 0, amount: 0 }
      // {"products":[{ "id": "", "amount": 0 }],"totalPrice":0}
      console.log("fileContent cart");
      console.log(fileContent);
      if (!err) cart = JSON.parse(fileContent);
      //Analize cart => find existing product
      console.log("cart");
      console.log(cart);
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //Add new product / incrizing price
      console.log("existingProduct");
      console.log(existingProduct);
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.amount += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        cart.products.push({ id, amount: 1 });
      }
      cart.totalPrice += +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log("err");
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return;

      const cart = JSON.parse(fileContent);
      const product = cart.products.find((prod) => prod.id === id);
      if (!product) return;
      if (product.amount > 1) {
        product.amount -= 1;
        cart.totalPrice -= productPrice;
      } else {
        cart.products = cart.products.filter((prod) => prod.id !== id);
      }
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }
}
