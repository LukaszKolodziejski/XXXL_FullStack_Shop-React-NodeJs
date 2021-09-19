import express from "express";
import Product from "../models/Product";
import Cart from "../models/Cart";
import User from "../models/User";

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
  req.user
    .deleteItemFromCart(prodId)
    .then((cart) => {
      console.log("cart postCartDeleteProduct");
      console.log(cart);
      // res.send({ cart });
      getCart(req, res);
    })
    .catch((err) => console.log(err));
  console.log("prodId");
  console.log(prodId);
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.send({ redirect: "/cart" });
  // });
};

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log("productId");
  console.log(typeof productId);
  Product.findById(productId, (product) => {
    return req.user.addToCart(product).then((data) => {
      // MOngo
      console.log("postCart data");
      console.log(data);
      res.send({ redirect: "/cart" });
    });
  });
};

export const getCart = (req, res, next) => {
  const { user } = req; // TODO: change user._id

  User.findById(user._id).then((data) => {
    console.log("getCart data");
    console.log(data.cart.items);
    res.send({ cart: data.cart.items });
  });
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProductsData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductsData) {
  //         cartProducts.push({
  //           productData: product,
  //           amount: cartProductsData.amount,
  //         });
  //       }
  //     }
  //     res.send({ products: cartProducts });
  //   });
  // });
};

export const postOrders = (req, res, next) => {
  const { user } = req; // TODO: change user._id
  req.user.addOrder().then((result) => {
    console.log("postOrders result");
    console.log(result);
    res.send({ redirect: "/orders" });
  });
};

export const getOrders = (req, res, next) => {
  const { user } = req; // TODO: change user._id
  req.user.fetchOrders().then((orders) => {
    console.log("postOrders orders");
    console.log(orders);
    res.send({ orders });
  });
};

export const getCheckout = (req, res, next) => {
  res.status(200);
};
