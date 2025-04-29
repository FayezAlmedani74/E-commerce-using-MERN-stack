import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemFromCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService";
import { ExtendRequest } from "../types/extendedRequest";
import { NextFunction, Response } from "express";

import { sendResponse } from "../utils/responseHanler";
import { CustomError } from "../types/customError";

const getActiveCartForUserController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    sendResponse(res, 200, cart);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const clearCartController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    sendResponse(res, response.statusCode, response.data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const addItemToCartController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    sendResponse(res, response.statusCode, response.data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const updateItemInCartController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });

    sendResponse(res, response.statusCode, response.data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const deleteItemFromCartController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.params;

    const response = await deleteItemFromCart({ userId, productId });
    sendResponse(res, response.statusCode, response.data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const checkoutController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    sendResponse(res, response.statusCode, response.data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

export {
  getActiveCartForUserController,
  clearCartController,
  addItemToCartController,
  updateItemInCartController,
  deleteItemFromCartController,
  checkoutController,
};
