// src/app/modules/ride/ride.interface.ts

import { Types } from 'mongoose';

export type RideStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED'

export interface IRide {
  rider: Types.ObjectId;
  riderName: string;
  riderEmail: string;
  riderPhone?: string;
  pickupLocation: string;  
  destination: string;
  status: RideStatus;
  driver?: Types.ObjectId;
  driverName?: string;
  driverEmail?: string;
  driverPhone?: string;
  fare?: number;
  requestedAt: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  distanceInKm?: number;
}