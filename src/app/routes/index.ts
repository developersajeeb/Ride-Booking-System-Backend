import { Router } from "express"
import { UserRoutes } from "../modules/user/user.router"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DriverRoutes } from "../modules/driver/driver.router"

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
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)