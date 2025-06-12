import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth,updateProfile } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-profile",verifyJWT,updateProfile)
router.get("/check", verifyJWT, checkAuth);

export default router;
