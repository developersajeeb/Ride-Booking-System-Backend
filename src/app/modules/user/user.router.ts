import { Router } from "express";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interfaces/common";


const router = Router()

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.get("/:id", checkAuth(...Object.values(Role)), UserControllers.getSingleUser)
router.patch('/block-unblock/:id',checkAuth(Role.ADMIN),UserControllers.blockUnblockUser);

export const UserRoutes = router