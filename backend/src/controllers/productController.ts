import { NextFunction, Request, Response } from "express";
import { getAllProducts } from "../services/productService";

import { sendResponse } from "../utils/responseHanler";
import { CustomError } from "../types/customError";

export const productController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProducts();
    sendResponse(res, 200, products);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};
