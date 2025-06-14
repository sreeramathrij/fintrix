import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller.js";

const router = express.Router();

router.use(verifyJWT);
router.route("/").post(createCategory).get(getCategories);
router.delete("/:id", verifyJWT, deleteCategory);
export default router;