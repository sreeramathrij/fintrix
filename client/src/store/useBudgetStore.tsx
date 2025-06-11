import { create } from "zustand";

import { api } from "@/lib/axios"
import toast from "react-hot-toast";
import type { AxiosError } from "axios";


interface Budget {
  _id: string | null;
  category: string;
  month: string;
  userId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

interface BudgetSummary {
  category: string | null;
  totalBudget: number;
  totalSpent: number;
  remaining: number;
}

interface BudgetData {
  amount: number;
  month: string;
  category: string;
}

interface BudgetStore {
  budgets: Budget[] | null;
  budgetSummary: BudgetSummary | null;
  isUpdatingBudget: boolean;
  isFetchingBudget: boolean;
  isFetchingBudgetSummary: boolean;
  isDeletingBudget: boolean;

  upsertBudget: (data: BudgetData) => void;
  getBudgetByMonth: (month: string) => void;
  getBudgetSummaryByMonth: (month: string) => void;
  getBudgetSummaryById: (month: string) => void;
  deleteBudget: (budgetId:string) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: null,
  budgetSummary: null,
  isUpdatingBudget: false,
  isFetchingBudget: false,
  isFetchingBudgetSummary: false,
  isDeletingBudget: true,

  upsertBudget: async (data: BudgetData) => {
    set({ isUpdatingBudget: true })
    try {
      const res = await api.post("/budgets", data);

      const savedBudget = res.data.savedBudget;

      set((state) => ({
        budgets: state.budgets ? [...state.budgets, savedBudget] : [savedBudget]
      }));
      toast.success("Category added successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error adding/editing budget:", axiosError);
      toast.error("Failed to add budget");
    } finally {
      set({ isUpdatingBudget: false })
    }
  },

  getBudgetByMonth: async (month: string) => {
    set({ isFetchingBudget: true })
    try {
      const res = await api.get("/budgets", {
        params: {
          month: month,
        }
      })

      set({ budgetSummary: res.data.data })
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetByMonth:", axiosError);
    } finally {
      set({ isFetchingBudget: false })
    }
  },

  getBudgetSummaryByMonth: async (month:string) => {
    set({ isFetchingBudgetSummary: true })
    try {
      const res = await api.get(`/budgets/summary`, {
        params: {
          month,
        }
      })

      set({ budgetSummary: res.data.data })
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetSummary:", axiosError);
    } finally {
      set({ isFetchingBudget: false })
    }
  },

  getBudgetSummaryById: async (budgetId:string) => {
    set({ isFetchingBudgetSummary: true })
    try {
      const res = await api.get(`/budgets/summary/${budgetId}`)

      set({ budgetSummary: res.data.data })
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetSummary:", axiosError);
    } finally {
      set({ isFetchingBudget: false })
    }
  },

  deleteBudget: async (budgetId:string) => {
    set({ isDeletingBudget: true })
    try {
      const res = await api.delete(`/budgets/${budgetId}`);

      set((state) => ({
        budgets: state.budgets?.filter(
            budget => budget._id !== budgetId
        ) || null,
      }));

      toast.success("Category deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error adding/editing budget:", axiosError);
      toast.error("Failed to add budget");
    } finally {
      set({ isDeletingBudget: false });
    }
  },
}))
