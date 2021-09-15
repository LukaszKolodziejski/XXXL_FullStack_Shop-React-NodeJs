import path from "path";
import express from "express";
import Product from "../models/product";
import * as adminController from "../controllers/admin";

const router = express.Router();

// router.get("/add-product", adminController.getAddProduct);
// // /admin/products => GET
// router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);
// router.post("/delete-product", adminController.postDeleteProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

//
//
//
//
//
//
//
//
// //TODO: Delete product logic
// router.post("/delete-product", (req, res, next) => {
//   const { productId } = req.body;
//   console.log("productId");
//   console.log(productId);
//   Product.deleteById(productId);
//   // res.send({ product });
//   //Redirect to /admin/Products
// });

export default router;
