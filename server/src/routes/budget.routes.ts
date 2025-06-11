import express from "express";
import {
  upsertBudget,
  getBudgetByMonth,
  deleteBudget,
  getBudgetById,
  getBudgetSummaryByMonth,
  getBudgetSummaryById,
} from "../controllers/budget.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.use(verifyJWT);

router.post("/", upsertBudget);
router.get("/", getBudgetByMonth);

router.get("/summary", getBudgetSummaryByMonth)
router.get("/summary/:id", getBudgetSummaryById)

router.get("/:id", getBudgetById);
router.delete("/:id", deleteBudget);

export default router;