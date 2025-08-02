import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../interfaces/common';
import { createDriverZodSchema } from "../user/user.validation";
import { DriverControllers } from "./driver.controller";

const router = Router();

router.post('/register', validateRequest(createDriverZodSchema), DriverControllers.registerDriver);
router.get('/earnings',checkAuth(Role.DRIVER),DriverControllers.getEarningsHistory);
router.patch('/approve/:id',checkAuth(Role.ADMIN),DriverControllers.approveDriver);

export const DriverRoutes = router;