"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_route_1 = require("../modules/auth/auth.route");
const driver_router_1 = require("../modules/driver/driver.router");
const ride_route_1 = require("../modules/ride/ride.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/user",
        route: user_router_1.UserRoutes
    },
    {
        path: "/driver",
        route: driver_router_1.DriverRoutes
    },
    {
        path: "/rides",
        route: ride_route_1.RiderRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
