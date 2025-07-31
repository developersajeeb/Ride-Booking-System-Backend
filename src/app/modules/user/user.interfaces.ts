import { IAuthProvider, Role } from "../../interfaces/common";

export interface IUser {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
  isDeleted?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  auths: IAuthProvider[]
}