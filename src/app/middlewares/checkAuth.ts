import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import AppError from "../helpers/AppError";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!")
        }
        // if (!isUserExist.isVerified) {
        //     throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
        // }
        if (!isUserExist.isApproved && isUserExist.role !== 'ADMIN' && isUserExist.role !== 'RIDER') {
            throw new AppError(httpStatus.FORBIDDEN, 'Your account is not approved yet. Please wait for admin approval.');
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is deleted!")
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}