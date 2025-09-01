import { IAuthProvider, OnlineStatus, Role } from "../../interfaces/common";

export interface IUser {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
  isDeleted?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  auths: IAuthProvider[];
  vehicleType?: string;
  vehicleNumber?: string;
  licenseNumber?: string;
  isApproved?: boolean;
  isAvailable?: boolean;
  onlineStatus?: OnlineStatus
}