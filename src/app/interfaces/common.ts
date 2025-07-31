export enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER",
}

export type OnlineStatus = 'online' | 'offline';

export interface IAuthProvider {
    // provider: "google" | "credentials";
    provider: "credentials";
    providerId: string;
}