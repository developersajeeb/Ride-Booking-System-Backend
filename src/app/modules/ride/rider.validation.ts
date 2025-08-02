import { z } from 'zod';

export const requestRideZodSchema = z.object({
    pickupLocation: z.string({ required_error: "Pickup location is required" }),
    destination: z.string({ required_error: "Destination is required" }),
    distanceInKm: z.number({ required_error: "Distance in km is required" }),
});