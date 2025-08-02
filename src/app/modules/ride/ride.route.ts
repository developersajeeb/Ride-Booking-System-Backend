import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../interfaces/common';
import { RideControllers } from './ride.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { requestRideZodSchema } from './rider.validation';

const router = Router();

router.post('/request', checkAuth(Role.RIDER), validateRequest(requestRideZodSchema), RideControllers.requestRide);
router.patch('/:id/cancel', checkAuth(Role.RIDER), RideControllers.cancelRide);
router.patch('/:rideId/respond', checkAuth(Role.DRIVER), RideControllers.respondToRideRequest);
router.patch('/:rideId/status', checkAuth(Role.DRIVER), RideControllers.updateRideStatus);
router.get('/driver-history', checkAuth(Role.DRIVER), RideControllers.getDriverRideHistory);
router.get('/rider-history', checkAuth(Role.RIDER), RideControllers.getRiderRideHistory);
router.get('/all-rides', checkAuth(Role.ADMIN), RideControllers.getAllRides);

export const RiderRoutes = router;