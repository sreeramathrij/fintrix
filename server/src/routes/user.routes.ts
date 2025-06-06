import { Router } from "express";
import { getMyProfile } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = Router();

router.get("/me", verifyJWT, getMyProfile);

export default router;

