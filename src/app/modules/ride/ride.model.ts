// src/app/modules/ride/ride.model.ts

import { Schema, model } from 'mongoose';
import { IRide } from './rider.interface';

const rideStatuses = [
    'REQUESTED',
    'ACCEPTED',
    'PICKED_UP',
    'IN_TRANSIT',
    'COMPLETED',
    'CANCELLED',
    'REJECTED',
] as const;

const rideSchema = new Schema<IRide>(
    {
        rider: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        riderName: {
            type: String,
            required: true,
        },
        riderEmail: {
            type: String,
            required: true,
        },
        riderPhone: {
            type: String,
            required: false,
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
        },
        driverName: {
            type: String,
            required: false,
        },
        driverEmail: {
            type: String,
            required: false,
        },
        driverPhone: {
            type: String,
            required: false,
        },
        pickupLocation: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: rideStatuses,
            default: 'REQUESTED',
        },

        fare: { type: Number },

        requestedAt: { type: Date, default: Date.now },
        acceptedAt: { type: Date },
        pickedUpAt: { type: Date },
        completedAt: { type: Date },
        cancelledAt: { type: Date },

        distanceInKm: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Ride = model<IRide>('Ride', rideSchema);