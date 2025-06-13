// src/store/useGoalStore.ts
import { create } from "zustand";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string | { _id: string; name: string; picture: string }; // can be populated or raw ID
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type CreateGoalInput = Omit<Goal, "_id" | "userId" | "createdAt" | "updatedAt">;

interface GoalStore {
  goals: Goal[] | null;
  isLoading: boolean;
  getGoals: () => Promise<void>;
  createGoal: (data: CreateGoalInput) => Promise<void>;
  updateGoal: (id: string, data: Partial<CreateGoalInput>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: null,
  isLoading: false,

  getGoals: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/goals");
      set({ goals: res.data.data });
    } catch (err) {
      toast.error("Failed to fetch goals");
    } finally {
      set({ isLoading: false });
    }
  },

  createGoal: async (goalData) => {
    try {
      const res = await api.post("/goals", goalData);
      set((state) => ({
        goals: state.goals ? [...state.goals, res.data.data] : [res.data.data],
      }));
      toast.success("Goal created");
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || "Failed to create goal");
    }
  },

  updateGoal: async (id, data) => {
    try {
      const res = await api.put(`/goals/${id}`, data);
      set((state) => ({
        goals: state.goals?.map((g) => (g._id === id ? res.data.data : g)) || [],
      }));
      toast.success("Goal updated");
    } catch (err) {
      toast.error("Failed to update goal");
    }
  },

  deleteGoal: async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      set((state) => ({
        goals: state.goals?.filter((g) => g._id !== id) || [],
      }));
      toast.success("Goal deleted");
    } catch (err) {
      toast.error("Failed to delete goal");
    }
  },
}));
