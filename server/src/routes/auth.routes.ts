import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth,updateProfile } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-profile",verifyJWT,updateProfile)
router.get("/check", verifyJWT, checkAuth);

export default router;
