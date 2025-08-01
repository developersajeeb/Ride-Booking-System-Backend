// src/app/modules/driver/driver.service.ts

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { Driver } from './driver.model';
import { User } from '../user/user.model';
import { envVars } from '../../config/env';
import { IAuthProvider } from '../../interfaces/common';
import { IUser } from '../user/user.interfaces';

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

const updateAvailability = async (driverId: string, status: 'online' | 'offline') => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  driver.onlineStatus = status;
  await driver.save();

  return driver;
};

const getEarnings = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  return driver.earnings || [];
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

export const DriverServices = {
  createDriver,
  updateAvailability,
  getEarnings,
  approveDriver,
};