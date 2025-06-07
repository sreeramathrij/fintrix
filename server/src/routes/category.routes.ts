import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

import { createCategory, getCategories } from "../controllers/category.controller";

const router = express.Router();

router.use(verifyJWT);
router.route("/").post(createCategory).get(getCategories);

export default router;