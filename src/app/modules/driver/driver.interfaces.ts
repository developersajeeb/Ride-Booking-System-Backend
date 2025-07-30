import { OnlineStatus, Role } from "../../interfaces/common";
import { IAuthProvider } from "../user/user.interfaces";

export interface IDriver {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber: string;
  role?: Role.DRIVER; 
  isApproved?: boolean;
  isDeleted?: string;
  isBlocked?: boolean;
  onlineStatus?: OnlineStatus;
  createdAt?: Date;
  updatedAt?: Date;
  auths: IAuthProvider[]
}