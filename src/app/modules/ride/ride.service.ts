// src/app/modules/ride/ride.service.ts

import httpStatus from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { User } from '../user/user.model';
import { IRide } from './rider.interface';
import { Ride } from './ride.model';

const requestRide = async (riderId: string, payload: Partial<IRide>) => {
  const { pickupLocation, destination } = payload;

  if (!pickupLocation || !destination) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Pickup and destination required');
  }

  const rider = await User.findById(riderId);
  if (!rider || rider.role !== 'RIDER') {
    throw new AppError(httpStatus.FORBIDDEN, 'Only riders can request rides');
  }

  const ride = await Ride.create({
    rider: riderId,
    pickupLocation,
    destination,
    status: 'requested',
    requestedAt: new Date(),
  });

  return ride;
};

const cancelRide = async (riderId: string, rideId: string) => {
  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
  }

  if (ride.rider.toString() !== riderId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You cannot cancel this ride');
  }

  if (ride.status !== 'REQUESTED') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot cancel after ride is accepted');
  }

  ride.status = 'CANCELLED';
  ride.cancelledAt = new Date();
  await ride.save();

  return ride;
};

const getRideHistory = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId }).sort({ createdAt: -1 });
  return rides;
};

export const RideServices = {
  requestRide,
  cancelRide,
  getRideHistory,
};