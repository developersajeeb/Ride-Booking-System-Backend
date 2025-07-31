import { IAuthProvider, OnlineStatus, Role } from "../../interfaces/common";

export interface IDriver {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
  role?: Role.DRIVER; 
  earnings: number;
  isApproved?: boolean;
  isDeleted?: string;
  isBlocked?: boolean;
  onlineStatus?: OnlineStatus;
  createdAt?: Date;
  updatedAt?: Date;
  auths: IAuthProvider[]
}