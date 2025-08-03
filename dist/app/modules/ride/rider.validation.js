"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRideZodSchema = void 0;
const zod_1 = require("zod");
exports.requestRideZodSchema = zod_1.z.object({
    pickupLocation: zod_1.z.string({ required_error: "Pickup location is required" }),
    destination: zod_1.z.string({ required_error: "Destination is required" }),
    distanceInKm: zod_1.z.number({ required_error: "Distance in km is required" }),
});
