// export type UserRole = 'admin' | 'rider' | 'driver';
export enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER",
}
export type OnlineStatus = 'online' | 'offline';

export interface IAuthProvider {
    provider: "google" | "credentials";
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