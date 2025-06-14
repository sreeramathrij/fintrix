import { AuthRequest } from "../middlewares/verifyJWT.middleware.js";
import { Response } from "express";
import { goalSchema } from "../schemas/goals.schema.js";
import { Goal } from "../models/goal.model.js";

export const createGoal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = goalSchema.safeParse(req.body);
    if(!parsed.success){
      res.status(400).json({ error: parsed.error.flatten() })
      return;
    }

    const goal = new Goal({ ...parsed.data, userId: req.user!._id});
    await goal.save();
    res.status(201).json({message: "Goal Created Successfully", data: goal});
  } catch (error) {
    console.log("Error in createGoal controller: ", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getGoals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const goals = await Goal.find({ userId: req.user!._id }).populate("category");
    res.status(200).json({data: goals});
  } catch (error) {
    console.log("Error in getGoals controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateGoal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = goalSchema.safeParse(req.body);
    if(!parsed.success){
      res.status(400).json({ error: parsed.error.flatten() })
      return;
    }

    const updatedGoal = await Goal.findOneAndUpdate(
      {_id: req.params.id, userId: req.user!._id},
      parsed.data,
      { new: true },
    )

    if(!updatedGoal) {
      res.status(404).json({ message: "Goal not found" });
    }

    res.status(201).json({message: "Goal Updated Successfully", data: updatedGoal});
  } catch (error) {
    console.log("Error in updateGoal controller: ", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const deleteGoal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deletedGoal = await Goal.findOneAndDelete(
      {_id: req.params.id, userId: req.user!._id},
    )

    if(!deletedGoal) {
      res.status(404).json({ message: "Goal not found" });
    }

    res.status(201).json({message: "Goal Deleted Successfully", data: deletedGoal});
  } catch (error) {
    console.log("Error in deleteGoal controller: ", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
}