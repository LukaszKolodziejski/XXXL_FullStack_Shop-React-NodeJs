import express from "express";
import Product from "../models/product";
import Cart from "../models/cart";

// mongoDB
export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.send({ products });
  });
};

// mongoDB
export const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log("productId");
  console.log(productId);
  Product.findById(productId, (product) => {
    console.log("product");
    console.log(product);
    res.send({ product });
  });
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("prodId");
  console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.send({ redirect: "/cart" });
  });
};

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("productId");
  console.log(typeof productId);
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    console.log("product");
    console.log(product);
    res.send({ redirect: "/cart" });
  });
};

export const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductsData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            amount: cartProductsData.amount,
          });
        }
      }
      res.send({ products: cartProducts });
    });
  });
};

export const getOrders = (req, res, next) => {
  res.status(200);
};

export const getCheckout = (req, res, next) => {
  res.status(200);
};
