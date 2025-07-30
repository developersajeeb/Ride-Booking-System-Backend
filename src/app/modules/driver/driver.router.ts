import { Router } from "express";
// import { validateRequest } from "../../middlewares/validateRequest";
// import { checkAuth } from "../../middlewares/checkAuth";
// import { Role } from "../../interfaces/common";


const router = Router()

// router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
// router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers)
// router.get("/:id", checkAuth(...Object.values(Role)), UserControllers.getSingleUser)

export const UserRoutes = router