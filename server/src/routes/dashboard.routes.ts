import express from 'express';

import {
  getDashboardSummary,
  getMonthlyTrends,
  getDailyTrends,
  getRecentTransactions,
  getTransactionSummaryByCategory
} from "../controllers/dashboard.controller";
import { verifyJWT } from '../middlewares/verifyJWT.middleware';

const router = express.Router();

router.get("/summary", verifyJWT, getDashboardSummary);
router.get("/category-summary", verifyJWT, getTransactionSummaryByCategory)
router.get("/monthly-trends", verifyJWT, getMonthlyTrends);
router.get("/daily-trends", verifyJWT, getDailyTrends);
router.get("/recent", verifyJWT, getRecentTransactions);

export default router;

