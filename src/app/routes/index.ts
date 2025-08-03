import { Router } from "express"
import { UserRoutes } from "../modules/user/user.router"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DriverRoutes } from "../modules/driver/driver.router"
import { RiderRoutes } from "../modules/ride/ride.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/driver",
        route: DriverRoutes
    },
    {
        path: "/rides",
        route: RiderRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})