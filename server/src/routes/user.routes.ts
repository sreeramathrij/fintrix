import { Router } from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.get("/me", verifyJWT, getMyProfile);

export default router;

