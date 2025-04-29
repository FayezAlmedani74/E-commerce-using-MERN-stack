import express from "express";
import { productController } from "../controllers/productController";
import { apiLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.get("/",apiLimiter, productController);

export default router;
