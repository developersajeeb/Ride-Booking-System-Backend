// src/app/modules/ride/ride.interface.ts

import { Types } from 'mongoose';

export type RideStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'PICKEd_UP'
  | 'IN_TRANSIT'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED'

export interface IRide {
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: string;  
  destination: string;
  status: RideStatus;
  fare?: number;
  requestedAt: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  distanceInKm?: number;
}