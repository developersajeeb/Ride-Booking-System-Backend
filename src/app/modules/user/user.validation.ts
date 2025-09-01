import z from "zod";

export const createUserZodSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(5).max(100),
  password: z
    .string()
    .min(6)
    .regex(/(?=.*[A-Z])/)
    .regex(/(?=.*[!@#$%^&*])/)
    .regex(/(?=.*\d)/),
  role: z.enum(["RIDER", "DRIVER"]),
  phone: z.string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: 'Phone number must be valid for Bangladesh (01XXXXXXXXX)',
    }),
  vehicleType: z.enum(["BIKE", "CAR", "OTHER"]).optional(),
  vehicleNumber: z.string().min(4).optional(),
  licenseNumber: z.string().min(4).optional(),
}).refine(
  (data) => {
    if (data.role === "DRIVER") {
      return data.phone && data.vehicleType && data.vehicleNumber && data.licenseNumber;
    }
    return true;
  },
  {
    message: "Driver registration requires phone, vehicleType, vehicleNumber, and licenseNumber",
    path: ["role"],
  }
);

export const updateUserZodSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  password: z
    .string()
    .min(6)
    .regex(/(?=.*[A-Z])/)
    .regex(/(?=.*[!@#$%^&*])/)
    .regex(/(?=.*\d)/)
    .optional(),
  role: z.enum(["RIDER", "DRIVER"]).optional(),
  phone: z.string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: 'Phone number must be valid for Bangladesh' })
    .optional(),
  vehicleType: z.enum(["BIKE", "CAR", "OTHER"]).optional(),
  vehicleNumber: z.string().min(4).optional(),
  licenseNumber: z.string().min(4).optional(),
}).refine(
  (data) => {
    if (data.role === "DRIVER") {
      return data.phone && data.vehicleType && data.vehicleNumber && data.licenseNumber;
    }
    return true;
  },
  {
    message: "Driver update requires phone, vehicleType, vehicleNumber, and licenseNumber",
    path: ["role"],
  }
);