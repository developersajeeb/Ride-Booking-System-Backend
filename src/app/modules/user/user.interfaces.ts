import { Role } from "../../interfaces/common";

export interface IAuthProvider {
    // provider: "google" | "credentials";
    provider: "credentials";
    providerId: string;
}

export interface IUser {
  _id?: string;
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