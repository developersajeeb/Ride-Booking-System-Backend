// src/app/modules/driver/driver.service.ts

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { envVars } from '../../config/env';
import { Driver } from './driver.model';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { IDriver } from './driver.interfaces';

const registerDriver = async (payload: Partial<IDriver>) => {
  const { email, password } = payload;

  const existingDriver = await Driver.findOne({ email });
  if (existingDriver) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Driver already exists');
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
  const newDriver = await Driver.create({
    ...payload,
    password: hashedPassword,
    role: 'DRIVER',
    isApproved: false,
    onlineStatus: 'offline',
    earnings: [],
  });

  return newDriver;
};

const getAllDrivers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Driver.find(), query);

  const driversData = queryBuilder
    .filter()
    .search(['name', 'email', 'vehicleType', 'vehicleNumber'])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    driversData.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleDriver = async (id: string) => {
  const driver = await Driver.findById(id).select('-password');
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  return driver;
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
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  driver.isApproved = true;
  await driver.save();

  return driver;
};

const blockDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver not found');
  }

  driver.isBlocked = !driver.isBlocked;
  await driver.save();

  return driver;
};

export const DriverServices = {
  registerDriver,
  getAllDrivers,
  getSingleDriver,
  updateAvailability,
  getEarnings,
  approveDriver,
  blockDriver,
};