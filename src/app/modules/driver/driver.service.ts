import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { User } from '../user/user.model';
import { envVars } from '../../config/env';
import { IAuthProvider } from '../../interfaces/common';
import { IUser } from '../user/user.interfaces';
import { Ride } from '../ride/ride.model';

const createDriver = async (payload: Partial<IUser>) => {
  const { email, password, vehicleType, vehicleNumber, licenseNumber, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
  const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string };

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "DRIVER",
    vehicleType,
    vehicleNumber,
    licenseNumber,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const getTotalEarningsRide = async (driverId: string) => {
  
  if (!driverId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  const rides = await Ride.find({ driver: driverId, status: 'COMPLETED' });
  const totalEarnings = rides.reduce(
    (acc: number, ride) => acc + (ride.fare || 0),
    0
  );

  const totalRides = rides.length;

  return {
    totalEarnings,
    totalRides,
  };
};

const approveDriver = async (driverId: string) => {
  const driver = await User.findOne({ _id: driverId, role: 'DRIVER' });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  driver.isApproved = true;
  await driver.save();

  return driver;
};

const suspendDriver = async (driverId: string) => {
  const driver = await User.findOne({ _id: driverId, role: 'DRIVER' });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  driver.isApproved = false;
  await driver.save();

  return driver;
};

export const DriverServices = {
  createDriver,
  getTotalEarningsRide,
  approveDriver,
  suspendDriver
};