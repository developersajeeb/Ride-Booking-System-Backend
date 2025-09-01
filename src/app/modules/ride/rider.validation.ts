import { z } from 'zod';

export const requestRideZodSchema = z.object({
  vehicleType: z.enum(["car", "bike"], {
    required_error: "Vehicle type is required",
    invalid_type_error: "Vehicle type must be either 'car' or 'bike'",
  }),
  pickupLocation: z
    .string({ required_error: "Pickup location is required" })
    .min(2, "Pickup location must be at least 2 characters long"),
  destination: z
    .string({ required_error: "Destination is required" })
    .min(2, "Destination must be at least 2 characters long"),
  distanceInKm: z.coerce
    .number({ required_error: "Distance in km is required" })
    .min(0.2, "Distance must be at least 0.2 km")
    .max(250, "Distance cannot exceed 250 km"),
  paymentMethod: z.enum(["cash", "digital_payment"], {
    required_error: "Payment method is required",
  }),
});