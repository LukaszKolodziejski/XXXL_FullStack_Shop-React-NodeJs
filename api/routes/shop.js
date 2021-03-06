import express from "express";

import * as shopController from "../controllers/shop";

const router = express.Router();

router.get("/", shopController.getProducts);
router.get("/product-detail/:productId", shopController.getProduct);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);
router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);
router.post("/create-order", shopController.postOrders);
router.get("/checkout", shopController.getCheckout);

export default router;
