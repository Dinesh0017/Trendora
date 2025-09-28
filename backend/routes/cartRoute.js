import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.put("/update", updateCart);
router.get("/", getUserCart);

export default router;
