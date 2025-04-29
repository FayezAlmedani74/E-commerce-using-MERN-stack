import express from "express";

import validateJWT from "../middlewares/validateJWT";
import {
  addItemToCartController,
  checkoutController,
  clearCartController,
  deleteItemFromCartController,
  getActiveCartForUserController,
  updateItemInCartController,
} from "../controllers/cartController";
import { apiLimiter } from "../utils/rateLimiter";

const router = express.Router();

router
  .get("/",apiLimiter, validateJWT, getActiveCartForUserController)
  .delete("/",apiLimiter, validateJWT, clearCartController);

router
  .post("/items",apiLimiter, validateJWT, addItemToCartController)
  .put("/items",apiLimiter, validateJWT, updateItemInCartController);

router.delete("/items/:productId",apiLimiter, validateJWT, deleteItemFromCartController);

router.post("/checkout",apiLimiter, validateJWT, checkoutController);
export default router;
