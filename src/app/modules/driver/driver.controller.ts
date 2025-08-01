/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { JwtPayload } from 'jsonwebtoken';
import { DriverServices } from './driver.service';
import { createUserTokens } from '../user/userTokens';
import { setAuthCookie } from '../../utils/setCookie';
import { User } from '../user/user.model';
import AppError from '../../helpers/AppError';

const registerDriver = catchAsync(async (req: Request, res: Response) => {
  const user = await DriverServices.createDriver(req.body);

  const tokens = createUserTokens(user);
  const { password, ...rest } = user.toObject();

  setAuthCookie(res, tokens);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Driver registered successfully",
    data: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: rest,
    },
  });
});

const getEarningsHistory = catchAsync(async (req, res: Response) => {
  const driverId = req.user as JwtPayload;
  const result = await DriverServices.getEarnings(driverId.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Earnings history fetched successfully',
    data: result,
  });
});

const approveDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const result = await DriverServices.approveDriver(driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver approved successfully',
    data: result,
  });
});

export const DriverControllers = {
  registerDriver,
  getEarningsHistory,
  approveDriver,
};
