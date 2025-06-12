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
  category?: string;
}

interface BudgetStore {
  budgets: Budget[];
  budgetSummaries: Record<string, BudgetSummary>;
  isUpdatingBudget: boolean;
  isFetchingBudget: boolean;
  isFetchingBudgetSummary: boolean;
  isDeletingBudget: boolean;

  upsertBudget: (data: BudgetData) => void;
  getBudgetsByMonth: (month: string) => void;
  getBudgetSummaryByMonth: (month: string, categoryId?: string) => void;
  getBudgetSummaryById: (month: string) => void;
  deleteBudget: (budgetId:string) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],
  budgetSummaries: {},
  isUpdatingBudget: false,
  isFetchingBudget: false,
  isFetchingBudgetSummary: false,
  isDeletingBudget: false,

  upsertBudget: async (data: BudgetData) => {
    set({ isUpdatingBudget: true });
    try {
      const res = await api.post("/budgets", data);
      const savedBudget = res.data.savedBudget;

      set((state) => {
        const budgets = [...state.budgets.filter(b => b._id !== savedBudget._id), savedBudget];

        const key = `${data.month}-${data.category || "all"}`;
        const prevSummary = state.budgetSummaries[key];

        const updatedSummary = prevSummary
          ? {
              ...prevSummary,
              totalBudget: prevSummary.totalBudget + (data.amount - (state.budgets.find(b => b._id === savedBudget._id)?.amount || 0)),
              remaining: prevSummary.remaining + (data.amount - (state.budgets.find(b => b._id === savedBudget._id)?.amount || 0))
            }
          : state.budgetSummaries[key]; 

        return {
          budgets,
          budgetSummaries: {
            ...state.budgetSummaries,
            ...(updatedSummary && { [key]: updatedSummary }),
          },
        };
      });

      toast.success("Budget updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error adding/editing budget:", axiosError);
      toast.error("Failed to add budget");
    } finally {
      set({ isUpdatingBudget: false });
    }
  },

  getBudgetsByMonth: async (month: string) => {
    set({ isFetchingBudget: true });
    try {
      const res = await api.get("/budgets", { params: { month } });
      set({ budgets: res.data.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetByMonth:", axiosError);
    } finally {
      set({ isFetchingBudget: false });
    }
  },

  getBudgetSummaryByMonth: async (month: string, categoryId?: string) => {
    set({ isFetchingBudgetSummary: true });
    const key = `${month}-${categoryId ?? "all"}`;
    try {
      const res = await api.get("/budgets/summary", {
        params: { month, ...(categoryId ? { categoryId } : {}) },
      });

      set((state) => ({
        budgetSummaries: {
          ...state.budgetSummaries,
          [key]: res.data.data,
        },
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetSummaryByMonth:", axiosError);
    } finally {
      set({ isFetchingBudgetSummary: false });
    }
  },

  getBudgetSummaryById: async (budgetId: string) => {
    set({ isFetchingBudgetSummary: true });
    try {
      const res = await api.get(`/budgets/summary/${budgetId}`);
      const key = budgetId;

      set((state) => ({
        budgetSummaries: {
          ...state.budgetSummaries,
          [key]: res.data.data,
        },
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in getBudgetSummaryById:", axiosError);
    } finally {
      set({ isFetchingBudgetSummary: false });
    }
  },

  deleteBudget: async (budgetId: string) => {
    set({ isDeletingBudget: true });
    try {
      await api.delete(`/budgets/${budgetId}`);
      set((state) => {
        const updatedSummaries = state.budgetSummaries
        delete updatedSummaries[budgetId]
        return{
          budgets: state.budgets.filter((b) => b._id !== budgetId),
          budgetSummaries: updatedSummaries,
        }
      });

      toast.success("Category deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error deleting budget:", axiosError);
      toast.error("Failed to delete budget");
    } finally {
      set({ isDeletingBudget: false });
    }
  },
}));
