import { ObjectId } from "mongodb";
import Product from "../models/product";

export const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  console.log("product");
  console.log(product);
  product.save();
  res.send({ product });
};

export const getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log("params productId");
  console.log(productId);
  const editMode = req.query.edit;
  if (!editMode) return;
  Product.findById(productId, (product) => {
    console.log("admin po product");
    console.log(product);
    res.send({ product });
  });
};

export const postEditProduct = (req, res, next) => {
  const { _id, title, imageUrl, price, description } = { ...req.body };
  console.log("postEditProduct _id");
  console.log(_id);
  const prodId = _id;
  const updatedProduct = new Product(_id, title, imageUrl, price, description);

  console.log("updatedProduct");
  console.log(updatedProduct);

  updatedProduct.save();
  console.log("post Edit title");
  console.log(updatedProduct);
  res.send({ redirect: "/" });
};

export const postDeleteProduct = (req, res, next) => {
  console.log("postDeleteProduct _id");
  const { _id } = req.body;
  console.log(_id);
  Product.deleteById(_id).then(() => {
    Product.fetchAll((products) => {
      res.send({ products });
    });
  });
};
