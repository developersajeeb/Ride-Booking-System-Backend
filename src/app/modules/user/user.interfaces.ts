import { UserRole } from "../../interfaces/common-type";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}