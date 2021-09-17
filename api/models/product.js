import fs from "fs";
import path from "path";

import { ObjectId } from "mongodb";
import { getDB } from "../utils/database";

import Cart from "./cart";

const filePath = path.join(__dirname, "../data/products.json");

export default class Product {
  constructor(_id, title, imageUrl, price, description) {
    this._id = new ObjectId(_id);
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    const db = getDB();
    // db.collection('products').insertOne({name:'Lukasz',age:22})

    console.log("this._id");
    console.log(this._id);

    if (this._id) {
      console.log("UPDATE !!!!!!");
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("NEW !!!!!!");
      return db
        .collection("products")
        .insertOne(this)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  static fetchAll(cb) {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((prod) => cb(prod))
      .catch((err) => cb([]));
  }

  static deleteById(_id) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(_id) })
      .then((res) => {
        console.log("delete");
        console.log(res);
      })
      .catch();
  }

  static findById(_id, cb) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new ObjectId(_id) })
      .next()
      .then((prod) => cb(prod))
      .catch((err) => {
        console.log(err);
        return cb({});
      });
  }
}
