import httpStatus from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { User } from '../user/user.model';
import { IRide } from './rider.interface';
import { Ride } from './ride.model';
import mongoose from 'mongoose';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { rideSearchableFields } from './ride.constant';

const requestRide = async (riderId: string, payload: Partial<IRide>) => {
  const { pickupLocation, destination, distanceInKm } = payload;

  if (!pickupLocation || !destination || !distanceInKm) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please check your inputs!');
  }

  const rider = await User.findById(riderId);
  if (!rider || rider.role !== 'RIDER') {
    throw new AppError(httpStatus.FORBIDDEN, 'Only riders can request rides');
  }

  const farePerKm = 20;
  const totalFare = parseFloat((distanceInKm * farePerKm).toFixed(2));

  const ride = await Ride.create({
    rider: riderId,
    riderName: rider.name,
    riderEmail: rider.email,
    riderPhone: rider.phone,
    pickupLocation,
    destination,
    distanceInKm,
    fare: totalFare,
    status: 'REQUESTED',
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

const getAllRides = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Ride.find(), query);

  const ridesData = queryBuilder
    .filter()
    .search(rideSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    ridesData.build(),
    queryBuilder.getMeta(),
  ]);

  return { meta, data };
};

const getDriverRideHistory = async (
  driverId: string,
  query: Record<string, string>
) => {
  const extendedQuery = { ...query, driver: driverId };
  const queryBuilder = new QueryBuilder(Ride.find(), extendedQuery);
  const ridesQuery = queryBuilder
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    ridesQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { meta, data };
};

const getRiderRideHistory = async (
  riderId: string,
  query: Record<string, string>
) => {
  const extendedQuery = { ...query, rider: riderId };
  const queryBuilder = new QueryBuilder(Ride.find(), extendedQuery);
  const ridesQuery = queryBuilder
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    ridesQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { meta, data };
};

const respondToRideRequest = async (driverId: string, rideId: string, response: 'ACCEPTED' | 'REJECTED') => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
  if (ride.status !== 'REQUESTED') throw new AppError(httpStatus.BAD_REQUEST, 'Ride is already responded');

  if (response === 'ACCEPTED') {
    const driver = await User.findById(driverId);
    if (!driver) throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');

    ride.status = 'ACCEPTED';
    ride.driver = new mongoose.Types.ObjectId(driverId);
    ride.driverName = driver.name;
    ride.driverEmail = driver.email;
    ride.driverPhone = driver.phone;
    ride.acceptedAt = new Date();
  } else {
    ride.status = 'REJECTED';
    ride.cancelledAt = new Date();
  }

  await ride.save();
  return ride;
};

const updateRideStatus = async (driverId: string, rideId: string, status: 'PICKED_UP' | 'IN_TRANSIT' | 'COMPLETED') => {
  const ride = await Ride.findById(rideId);

  if (!ride) throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
  if (!ride.driver || ride.driver.toString() !== driverId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not assigned to this ride');
  }

  if (status === 'PICKED_UP' && ride.status !== 'ACCEPTED') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Ride must be accepted first');
  }
  if (status === 'IN_TRANSIT' && ride.status !== 'PICKED_UP') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Ride must be picked up first');
  }
  if (status === 'COMPLETED' && ride.status !== 'IN_TRANSIT') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Ride must be in transit to complete');
  }
   if (status === 'COMPLETED') {
    ride.completedAt = new Date();
  }

  ride.status = status;
  ride.cancelledAt = new Date();
  await ride.save();

  return ride;
};

export const RideServices = {
  requestRide,
  cancelRide,
  getAllRides,
  getDriverRideHistory,
  getRiderRideHistory,
  respondToRideRequest,
  updateRideStatus,
};