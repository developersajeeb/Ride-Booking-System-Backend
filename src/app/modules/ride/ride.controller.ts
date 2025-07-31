import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { RideServices } from "./ride.service";

const requestRide = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const ride = await RideServices.requestRide(user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Ride requested successfully',
    data: ride,
  });
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const rideId = req.params.id;

  const result = await RideServices.cancelRide(user.userId, rideId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ride cancelled successfully',
    data: result,
  });
});

const getRideHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const history = await RideServices.getRideHistory(user.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ride history fetched successfully',
    data: history,
  });
});

export const RideControllers = {
    requestRide,
    cancelRide,
    getRideHistory,
}