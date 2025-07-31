// src/app/modules/driver/driver.route.ts

import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../interfaces/common';
import { createDriverZodSchema } from './driver.validation';
import { DriverControllers } from './driver.controller';

const router = Router();

router.post('/register', validateRequest(createDriverZodSchema), DriverControllers.registerDriver);
router.patch('/availability',checkAuth(Role.DRIVER),DriverControllers.updateAvailabilityStatus);
router.get('/earnings',checkAuth(Role.DRIVER),DriverControllers.getEarningsHistory);
router.get('/',checkAuth(Role.ADMIN),DriverControllers.getAllDrivers);
router.get('/:id',checkAuth(Role.ADMIN, Role.DRIVER),DriverControllers.getSingleDriver);
router.patch('/approve/:id',checkAuth(Role.ADMIN),DriverControllers.approveDriver);
router.patch('/block/:id',checkAuth(Role.ADMIN),DriverControllers.blockDriver);

export const DriverRoutes = router;