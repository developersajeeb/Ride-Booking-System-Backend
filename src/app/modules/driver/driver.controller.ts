/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { JwtPayload } from 'jsonwebtoken';
import { DriverServices } from './driver.service';

const registerDriver = catchAsync(async (req: Request, res: Response) => {
  const user = await DriverServices.createDriver(req.body);
  const { password, ...rest } = user.toObject();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Driver registered successfully",
    data: {
      user: rest,
    },
  });
});

const getTotalEarningsRideHistory = catchAsync(async (req, res: Response) => {
  const driver = req.user as JwtPayload;
  const driverId = driver.userId
  
  const result = await DriverServices.getTotalEarningsRide(driverId);

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

const suspendDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const result = await DriverServices.suspendDriver(driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver suspended successfully',
    data: result,
  });
});

export const DriverControllers = {
  registerDriver,
  getTotalEarningsRideHistory,
  approveDriver,
  suspendDriver
};
