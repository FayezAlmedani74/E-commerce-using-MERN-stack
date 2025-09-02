import { getMyOrders, login, register } from "../services/userService";
import { ExtendRequest } from "../types/extendedRequest";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/customError";
import { sendResponse } from "../utils/responseHanler";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    sendResponse(res, statusCode, data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({
      email,
      password,
    });
    sendResponse(res, statusCode, data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

const getMyOrdersController = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    console.log(userId)
    const { data, statusCode } = await getMyOrders({ userId });
    console.log(data)
    sendResponse(res, statusCode, data);
  } catch (error) {
    const customError = error as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

export { registerController, loginController, getMyOrdersController };
