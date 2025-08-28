/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { createUserTokens } from "./userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body);

  const tokens = createUserTokens(user);
  const { password, ...rest } = user.toObject();

  setAuthCookie(res, tokens);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Account created successfully",
    data: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: rest,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserServices.getAllUsers(query as Record<string, string>);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
});

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Retrieved Successfully",
        data: result.data
    })
});

const blockUnblockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { isBlocked } = req.body;

  const result = await UserServices.blockUnblockUser(userId, isBlocked);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userEmail = (req.user as JwtPayload).email;
    const payload = req.body;

    const user = await UserServices.updateUser(userEmail, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Updated Successfully",
        data: user,
    });
});


export const UserControllers = {
    createUser,
    updateUser,
    getMe,
    getAllUsers,
    getSingleUser,
    blockUnblockUser
}