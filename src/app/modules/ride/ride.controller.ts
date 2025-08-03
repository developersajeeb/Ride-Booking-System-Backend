/* eslint-disable @typescript-eslint/no-dynamic-delete */
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
    message: "Ride requested successfully",
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
    message: "Ride cancelled successfully",
    data: result,
  });
});

const getDriverRideHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const history = await RideServices.getDriverRideHistory(
    user.userId,
    req.query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride history fetched successfully",
    data: history,
  });
});

const getRiderRideHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const history = await RideServices.getRiderRideHistory(
    user.userId,
    req.query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride history fetched successfully",
    data: history,
  });
});


const getAllRides = catchAsync(async (req: Request, res: Response) => {
  const { pickupLocation, destination, status, email, phone } = req.query;

  const filters: Record<string, string> = {
    pickupLocation: pickupLocation as string,
    destination: destination as string,
    status: status as string,
    driverEmail: email as string,
    phone: phone as string,
  };

  Object.keys(filters).forEach(key => {
    if (!filters[key]) delete filters[key];
  });

  const result = await RideServices.getAllRides(filters);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All rides fetched successfully",
    data: result,
  });
});

const respondToRideRequest = catchAsync(async (req: Request, res: Response) => {
  const driver = req.user as JwtPayload;
  const rideId = req.params.rideId;
  const { status } = req.body;

  const result = await RideServices.respondToRideRequest(driver.userId, rideId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Ride request ${status}`,
    data: result,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const driver = req.user as JwtPayload;
  const rideId = req.params.rideId;
  const { status } = req.body;

  const result = await RideServices.updateRideStatus(driver.userId, rideId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride status updated",
    data: result,
  });
});

export const RideControllers = {
  requestRide,
  cancelRide,
  getAllRides,
  getDriverRideHistory,
  getRiderRideHistory,
  respondToRideRequest,
  updateRideStatus,
};