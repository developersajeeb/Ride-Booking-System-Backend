/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
// import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IUser } from "./user.interfaces";
import { User } from "./user.model";
import AppError from "../../helpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { IAuthProvider } from "../../interfaces/common";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role, phone, vehicleType, vehicleNumber, licenseNumber, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
  const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string };

  const userData: any = {
    email,
    phone,
    password: hashedPassword,
    role: role || "RIDER",
    auths: [authProvider],
    onlineStatus: "online",
    phone,
    ...rest,
  };

  if (role === "DRIVER") {
    userData.vehicleType = vehicleType;
    userData.vehicleNumber = vehicleNumber;
    userData.licenseNumber = licenseNumber;
  }

  const user = await User.create(userData);
  return user;
};

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};

const getAllUsers = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(User.find(), query)
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
};

const blockUnblockUser = async (userId: string, isBlocked: boolean) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.isBlocked = isBlocked;
  await user.save();

  return user;
};

const updateUser = async (userEmail: string, payload: Partial<IUser>) => {
    const ifUserExist = await User.findOne({ email: userEmail });

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }
    const allowedFields: (keyof Pick<IUser, "name" | "phone" | "password">)[] = ["name", "phone", "password"];
    const filteredPayload: Partial<IUser> = {};

    for (const key of allowedFields) {
        if (payload[key] !== undefined) {
            filteredPayload[key] = payload[key] as string;
        }
    }

    if (filteredPayload.password) {
        filteredPayload.password = await bcryptjs.hash(
            filteredPayload.password,
            Number(envVars.BCRYPT_SALT_ROUND)
        );
    }

    const newUpdatedUser = await User.findOneAndUpdate({ email: userEmail }, filteredPayload, {
        new: true,
        runValidators: true,
    });

    return newUpdatedUser;
};

export const UserServices = {
    createUser,
    updateUser,
    getMe,
    getAllUsers,
    getSingleUser,
    blockUnblockUser,
}