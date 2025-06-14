import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getOneTransaction,
  getTransactionsInRange
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .post(addTransaction)
  .get(getTransactionsInRange)

router
  .route("/:id")
  .get(getOneTransaction)
  .put(editTransaction)
  .delete(deleteTransaction)

export default router;