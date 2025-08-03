"use strict";
// src/app/modules/ride/ride.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const rideStatuses = [
    'REQUESTED',
    'ACCEPTED',
    'PICKED_UP',
    'IN_TRANSIT',
    'COMPLETED',
    'CANCELLED',
    'REJECTED',
];
const rideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.Ride = (0, mongoose_1.model)('Ride', rideSchema);
