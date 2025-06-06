import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getOneTransaction,
  getTransactions
} from "../controllers/transaction.controller";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .post(addTransaction)
  .get(getTransactions)

router
  .route("/:id")
  .get(getOneTransaction)
  .put(editTransaction)
  .delete(deleteTransaction)

export default router;