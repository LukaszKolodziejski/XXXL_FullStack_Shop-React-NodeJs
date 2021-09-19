// Routes user.js

import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

// /user/create-account => POST

router.post("/create-account", userController.postCreateAccount);

export default router;
