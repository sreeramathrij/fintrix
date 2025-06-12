import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller";

const router = express.Router();

router.use(verifyJWT);
router.route("/").post(createCategory).get(getCategories);
router.delete("/:id", verifyJWT, deleteCategory);
export default router;