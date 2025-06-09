import express from "express";
import {
  upsertBudget,
  getBudgetByMonth,
  deleteBudget,
  getBudgetSummary,
} from "../controllers/budget.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.use(verifyJWT);

router.post("/", upsertBudget);
router.get("/", getBudgetByMonth);
router.delete("/:id", deleteBudget);
router.get("/summary", getBudgetSummary)

export default router;