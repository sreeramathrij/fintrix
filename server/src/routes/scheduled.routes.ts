import express from "express";

import {
  createScheduledTransaction,
  getScheduledTransactions,
  toggleScheduledTransaction,
} from "../controllers/scheduledTransaction.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .post(createScheduledTransaction)
  .get(getScheduledTransactions);

router.patch("/:id/toggle", toggleScheduledTransaction);

export default router;
