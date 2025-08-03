"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityZodSchema = exports.updateDriverZodSchema = exports.createDriverZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDriverZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ invalid_type_error: 'Name must be string' })
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(100, { message: 'Name cannot exceed 100 characters.' }),
    email: zod_1.default
        .string({ invalid_type_error: 'Email must be string' })
        .email({ message: 'Invalid email address format.' })
        .min(5, { message: 'Email must be at least 5 characters long.' })
        .max(100, { message: 'Email cannot exceed 100 characters.' }),
    password: zod_1.default
        .string({ invalid_type_error: 'Password must be string' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .regex(/(?=.*[A-Z])/, {
        message: 'Password must contain at least 1 uppercase letter.',
    })
        .regex(/(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least 1 special character.',
    })
        .regex(/(?=.*\d)/, {
        message: 'Password must contain at least 1 number.',
    }),
    phone: zod_1.default
        .string({ invalid_type_error: 'Phone must be string' })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: 'Phone number must be valid for Bangladesh (01XXXXXXXXX)',
    }),
    vehicleType: zod_1.default.enum(['BIKE', 'CAR', 'OTHER'], {
        required_error: 'Vehicle type is required and must be Bike, Car, or Other.',
    }),
    vehicleNumber: zod_1.default
        .string({ invalid_type_error: 'Vehicle number must be string' })
        .min(4, { message: 'Vehicle number must be at least 4 characters.' }),
    licenseNumber: zod_1.default
        .string({ invalid_type_error: 'License number must be string' })
        .min(4, { message: 'License number must be at least 4 characters.' }),
});
exports.updateDriverZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ invalid_type_error: 'Name must be string' })
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(100, { message: 'Name cannot exceed 100 characters.' })
        .optional(),
    password: zod_1.default
        .string({ invalid_type_error: 'Password must be string' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .regex(/(?=.*[A-Z])/, {
        message: 'Password must contain at least 1 uppercase letter.',
    })
        .regex(/(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least 1 special character.',
    })
        .regex(/(?=.*\d)/, {
        message: 'Password must contain at least 1 number.',
    })
        .optional(),
    phone: zod_1.default
        .string({ invalid_type_error: 'Phone must be string' })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: 'Phone number must be valid for Bangladesh (01XXXXXXXXX)',
    })
        .optional(),
    vehicleType: zod_1.default.enum(['bike', 'car', 'other']).optional(),
    vehicleNumber: zod_1.default.string().min(4).optional(),
    licenseNumber: zod_1.default.string().min(4).optional(),
    isBlocked: zod_1.default
        .boolean({ invalid_type_error: 'isBlocked must be true or false' })
        .optional(),
    isApproved: zod_1.default
        .boolean({ invalid_type_error: 'isApproved must be true or false' })
        .optional(),
    onlineStatus: zod_1.default.enum(['online', 'offline']).optional(),
});
exports.availabilityZodSchema = zod_1.default.object({
    status: zod_1.default.enum(['online', 'offline'], {
        errorMap: () => ({ message: 'Status must be either online or offline' }),
    }),
});
