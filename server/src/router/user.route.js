import { Router } from "express";
import {
    forgotPassword,
	getCurrentUser,
	loginUser,
	logoutUser,
	registerUser,
    resetPassword,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/user/me").get(verifyJWT, getCurrentUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
