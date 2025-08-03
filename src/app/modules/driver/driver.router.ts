import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../interfaces/common';
import { createDriverZodSchema } from "../user/user.validation";
import { DriverControllers } from "./driver.controller";

const router = Router();

router.post('/register', validateRequest(createDriverZodSchema), DriverControllers.registerDriver);
router.get('/earnings-rides',checkAuth(Role.DRIVER),DriverControllers.getTotalEarningsRideHistory);
router.patch('/approve/:id',checkAuth(Role.ADMIN),DriverControllers.approveDriver);
router.patch('/suspend/:id',checkAuth(Role.ADMIN),DriverControllers.suspendDriver);

export const DriverRoutes = router;