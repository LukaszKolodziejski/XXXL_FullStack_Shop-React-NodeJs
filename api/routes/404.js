import path from "path";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/404.html"));
});

export default router;
