/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { DriverServices } from './driver.service';
import { JwtPayload } from 'jsonwebtoken';

const registerDriver = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const driver = await DriverServices.registerDriver(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Driver registered successfully',
    data: driver,
  });
});

const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await DriverServices.getAllDrivers(query as Record<string, string>);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All drivers retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DriverServices.getSingleDriver(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver retrieved successfully',
    data: result,
  });
});

const updateAvailabilityStatus = catchAsync(async (req, res: Response) => {
  const driverId = req.user as JwtPayload;
  const { status } = req.body;
  const result = await DriverServices.updateAvailability(driverId.id, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Availability status updated',
    data: result,
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

const blockDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const result = await DriverServices.blockDriver(driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver block/unblock status updated',
    data: result,
  });
});

export const DriverControllers = {
  registerDriver,
  getAllDrivers,
  getSingleDriver,
  updateAvailabilityStatus,
  getEarningsHistory,
  approveDriver,
  blockDriver,
};
