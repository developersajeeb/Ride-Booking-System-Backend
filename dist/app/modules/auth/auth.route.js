"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const common_1 = require("../../interfaces/common");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthControllers.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthControllers.getNewAccessToken);
router.post("/logout", auth_controller_1.AuthControllers.logout);
router.post("/change-password", (0, checkAuth_1.checkAuth)(...Object.values(common_1.Role)), auth_controller_1.AuthControllers.changePassword);
router.post("/set-password", (0, checkAuth_1.checkAuth)(...Object.values(common_1.Role)), auth_controller_1.AuthControllers.setPassword);
router.post("/forgot-password", auth_controller_1.AuthControllers.forgotPassword);
router.post("/reset-password", (0, checkAuth_1.checkAuth)(...Object.values(common_1.Role)), auth_controller_1.AuthControllers.resetPassword);
// router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
//     const redirect = req.query.redirect || "/"
//     passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
// })
// router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with out support team!` }), AuthControllers.googleCallbackController)
exports.AuthRoutes = router;
