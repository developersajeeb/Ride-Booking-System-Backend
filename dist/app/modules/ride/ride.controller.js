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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const ride_service_1 = require("./ride.service");
const requestRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const ride = yield ride_service_1.RideServices.requestRide(user.userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Ride requested successfully",
        data: ride,
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const rideId = req.params.id;
    const result = yield ride_service_1.RideServices.cancelRide(user.userId, rideId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Ride cancelled successfully",
        data: result,
    });
}));
const getDriverRideHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const history = yield ride_service_1.RideServices.getDriverRideHistory(user.userId, req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Ride history fetched successfully",
        data: history,
    });
}));
const getRiderRideHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const history = yield ride_service_1.RideServices.getRiderRideHistory(user.userId, req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Ride history fetched successfully",
        data: history,
    });
}));
const getAllRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pickupLocation, destination, status, email, phone } = req.query;
    const filters = {
        pickupLocation: pickupLocation,
        destination: destination,
        status: status,
        driverEmail: email,
        phone: phone,
    };
    Object.keys(filters).forEach(key => {
        if (!filters[key])
            delete filters[key];
    });
    const result = yield ride_service_1.RideServices.getAllRides(filters);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All rides fetched successfully",
        data: result,
    });
}));
const respondToRideRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = req.user;
    const rideId = req.params.rideId;
    const { status } = req.body;
    const result = yield ride_service_1.RideServices.respondToRideRequest(driver.userId, rideId, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `Ride request ${status}`,
        data: result,
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = req.user;
    const rideId = req.params.rideId;
    const { status } = req.body;
    const result = yield ride_service_1.RideServices.updateRideStatus(driver.userId, rideId, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Ride status updated",
        data: result,
    });
}));
exports.RideControllers = {
    requestRide,
    cancelRide,
    getAllRides,
    getDriverRideHistory,
    getRiderRideHistory,
    respondToRideRequest,
    updateRideStatus,
};
