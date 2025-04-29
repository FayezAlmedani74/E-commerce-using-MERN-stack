import express from "express";
import validateJWT from "../middlewares/validateJWT";
import {
  getMyOrdersController,
  loginController,
  registerController,
} from "../controllers/userController";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../validations/userValidation";
import { apiLimiter, authLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.post("/register",authLimiter, validateRequest(registerSchema), registerController);
router.post("/login",authLimiter, validateRequest(loginSchema), loginController);
router.get("/my-orders",apiLimiter, validateJWT, getMyOrdersController);
export default router;
