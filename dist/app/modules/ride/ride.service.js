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
exports.RideServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const ride_model_1 = require("./ride.model");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const ride_constant_1 = require("./ride.constant");
const requestRide = (riderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { pickupLocation, destination, distanceInKm } = payload;
    if (!pickupLocation || !destination || !distanceInKm) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Please check your inputs!');
    }
    const rider = yield user_model_1.User.findById(riderId);
    if (!rider || rider.role !== 'RIDER') {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Only riders can request rides');
    }
    const farePerKm = 20;
    const totalFare = parseFloat((distanceInKm * farePerKm).toFixed(2));
    const ride = yield ride_model_1.Ride.create({
        rider: riderId,
        riderName: rider.name,
        riderEmail: rider.email,
        riderPhone: rider.phone,
        pickupLocation,
        destination,
        distanceInKm,
        fare: totalFare,
        status: 'REQUESTED',
        requestedAt: new Date(),
    });
    return ride;
});
const cancelRide = (riderId, rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
    }
    if (ride.rider.toString() !== riderId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You cannot cancel this ride');
    }
    if (ride.status !== 'REQUESTED') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Cannot cancel after ride is accepted');
    }
    ride.status = 'CANCELLED';
    ride.cancelledAt = new Date();
    yield ride.save();
    return ride;
});
const getAllRides = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), query);
    const ridesData = queryBuilder
        .filter()
        .search(ride_constant_1.rideSearchableFields)
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        ridesData.build(),
        queryBuilder.getMeta(),
    ]);
    return { meta, data };
});
const getDriverRideHistory = (driverId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const extendedQuery = Object.assign(Object.assign({}, query), { driver: driverId });
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), extendedQuery);
    const ridesQuery = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        ridesQuery.build(),
        queryBuilder.getMeta(),
    ]);
    return { meta, data };
});
const getRiderRideHistory = (riderId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const extendedQuery = Object.assign(Object.assign({}, query), { rider: riderId });
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), extendedQuery);
    const ridesQuery = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        ridesQuery.build(),
        queryBuilder.getMeta(),
    ]);
    return { meta, data };
});
const respondToRideRequest = (driverId, rideId, response) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
    if (ride.status !== 'REQUESTED')
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Ride is already responded');
    if (response === 'ACCEPTED') {
        const driver = yield user_model_1.User.findById(driverId);
        if (!driver)
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
        ride.status = 'ACCEPTED';
        ride.driver = new mongoose_1.default.Types.ObjectId(driverId);
        ride.driverName = driver.name;
        ride.driverEmail = driver.email;
        ride.driverPhone = driver.phone;
        ride.acceptedAt = new Date();
    }
    else {
        ride.status = 'REJECTED';
        ride.cancelledAt = new Date();
    }
    yield ride.save();
    return ride;
});
const updateRideStatus = (driverId, rideId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
    if (!ride.driver || ride.driver.toString() !== driverId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not assigned to this ride');
    }
    if (status === 'PICKED_UP' && ride.status !== 'ACCEPTED') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Ride must be accepted first');
    }
    if (status === 'IN_TRANSIT' && ride.status !== 'PICKED_UP') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Ride must be picked up first');
    }
    if (status === 'COMPLETED' && ride.status !== 'IN_TRANSIT') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Ride must be in transit to complete');
    }
    if (status === 'COMPLETED') {
        ride.completedAt = new Date();
    }
    ride.status = status;
    ride.cancelledAt = new Date();
    yield ride.save();
    return ride;
});
exports.RideServices = {
    requestRide,
    cancelRide,
    getAllRides,
    getDriverRideHistory,
    getRiderRideHistory,
    respondToRideRequest,
    updateRideStatus,
};
