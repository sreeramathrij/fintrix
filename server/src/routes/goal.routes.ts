import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.use(verifyJWT);

router.post("/", createGoal);
router.get("/", getGoals);

router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;