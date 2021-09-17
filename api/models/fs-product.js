/**** 
Version with fs - File System
****/

import fs from "fs";
import path from "path";
import Cart from "./cart";

const filePath = path.join(__dirname, "../data/products.json");

export default class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) products = JSON.parse(fileContent);
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;

        fs.writeFile(filePath, JSON.stringify(updateProducts), (err) => {
          console.log("update err");
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return cb([]);
      return cb(JSON.parse(fileContent));
    });
  }

  static deleteById(id) {
    fs.readFile(filePath, (err, fileContent) => {
      const products = JSON.parse(fileContent);
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) Cart.deleteProduct(id, product.price);
      });
    });
  }

  static findById(id, cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const products = JSON.parse(fileContent);
      const product = products.find((prod) => prod.id === id);

      if (err) return cb([]);
      cb(product);
    });
  }
}
