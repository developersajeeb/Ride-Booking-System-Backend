import z from 'zod';

export const createDriverZodSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Name must be string' })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),

  email: z
    .string({ invalid_type_error: 'Email must be string' })
    .email({ message: 'Invalid email address format.' })
    .min(5, { message: 'Email must be at least 5 characters long.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),

  password: z
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

  phone: z
    .string({ invalid_type_error: 'Phone must be string' })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: 'Phone number must be valid for Bangladesh (01XXXXXXXXX)',
    }),

  vehicleType: z.enum(['BIKE', 'CAR', 'OTHER'], {
    required_error: 'Vehicle type is required and must be Bike, Car, or Other.',
  }),

  vehicleNumber: z
    .string({ invalid_type_error: 'Vehicle number must be string' })
    .min(4, { message: 'Vehicle number must be at least 4 characters.' }),

  licenseNumber: z
    .string({ invalid_type_error: 'License number must be string' })
    .min(4, { message: 'License number must be at least 4 characters.' }),
});

export const updateDriverZodSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Name must be string' })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' })
    .optional(),

  password: z
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

  phone: z
    .string({ invalid_type_error: 'Phone must be string' })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: 'Phone number must be valid for Bangladesh (01XXXXXXXXX)',
    })
    .optional(),

  vehicleType: z.enum(['bike', 'car', 'other']).optional(),

  vehicleNumber: z.string().min(4).optional(),

  licenseNumber: z.string().min(4).optional(),

  isBlocked: z
    .boolean({ invalid_type_error: 'isBlocked must be true or false' })
    .optional(),

  isApproved: z
    .boolean({ invalid_type_error: 'isApproved must be true or false' })
    .optional(),

  onlineStatus: z.enum(['online', 'offline']).optional(),
});

export const availabilityZodSchema = z.object({
  status: z.enum(['online', 'offline'], {
    errorMap: () => ({ message: 'Status must be either online or offline' }),
  }),
});