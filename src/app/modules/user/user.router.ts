import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interfaces/common";
import { createUserZodSchema } from "./user.validation";
import { AnyZodObject } from "zod";


const router = Router()

router.post("/register", validateRequest(createUserZodSchema as unknown as AnyZodObject), UserControllers.createUser);
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);
router.patch("/update-my-profile", checkAuth(...Object.values(Role)), UserControllers.updateUser);
router.get("/:id", checkAuth(...Object.values(Role)), UserControllers.getSingleUser);
router.patch('/block-unblock/:id',checkAuth(Role.ADMIN),UserControllers.blockUnblockUser);

export const UserRoutes = router