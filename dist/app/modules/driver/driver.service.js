"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const env_1 = require("../../config/env");
const ride_model_1 = require("../ride/ride.model");
const createDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, vehicleType, vehicleNumber, licenseNumber } = payload, rest = __rest(payload, ["email", "password", "vehicleType", "vehicleNumber", "licenseNumber"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = { provider: "credentials", providerId: email };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, role: "DRIVER", vehicleType,
        vehicleNumber,
        licenseNumber, auths: [authProvider] }, rest));
    return user;
});
const getTotalEarningsRide = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!driverId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    const rides = yield ride_model_1.Ride.find({ driver: driverId, status: 'COMPLETED' });
    const totalEarnings = rides.reduce((acc, ride) => acc + (ride.fare || 0), 0);
    const totalRides = rides.length;
    return {
        totalEarnings,
        totalRides,
    };
});
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findOne({ _id: driverId, role: 'DRIVER' });
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    driver.isApproved = true;
    yield driver.save();
    return driver;
});
const suspendDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findOne({ _id: driverId, role: 'DRIVER' });
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
    }
    driver.isApproved = false;
    yield driver.save();
    return driver;
});
exports.DriverServices = {
    createDriver,
    getTotalEarningsRide,
    approveDriver,
    suspendDriver
};
