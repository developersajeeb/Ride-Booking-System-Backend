// src/app/modules/driver/driver.model.ts

import { Schema, model } from 'mongoose';
import { IAuthProvider } from '../user/user.interfaces';
import { IDriver } from './driver.interfaces';

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const driverSchema = new Schema<IDriver>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      match: /^(?:\+8801\d{9}|01\d{9})$/,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ['BIKE', 'CAR', 'OTHER'],
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['DRIVER'],
      default: 'DRIVER',
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    onlineStatus: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Driver = model<IDriver>('Driver', driverSchema);
