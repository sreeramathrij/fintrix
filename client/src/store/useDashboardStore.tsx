import { create } from "zustand"

import { api } from "@/lib/axios";
import toast from "react-hot-toast"

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface CategorySummery {
  totalAmount: number;
  categoryId: string;
  name: string;
  picture: string;
  type: string;
}

interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

interface DailyTrend {
  _id: string;
  income: number;
  expense: number;
}

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  date: string;
  description: string;
  category: {
      _id: string,
      name: string,
      type: string,
      picture: string
  };
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStore {
  summary: Summary | null,
  categorySummary: CategorySummery[] | null,
  monthlyTrends: MonthlyTrend[] | null,
  dailyTrends: DailyTrend[] | null,
  recentTransactions: Transaction[] | null,

  isFetchingDashboardData: boolean,

  getDashboardSummary: (from: string, to:string) => void;
  getTransactionSummaryByCategory: (from: string, to:string) => void;
  getMonthlyTrends: () => void;
  getDailyTrends: (month: string, year: string) => void;
  getRecentTransactions: (limit?: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  summary: null,
  categorySummary: null,
  monthlyTrends: null,
  dailyTrends: null,
  recentTransactions: null,

  isFetchingDashboardData: false,

  getDashboardSummary: async (from, to) => {
    set({ isFetchingDashboardData: true });
    try {
      const res = await api.get("/dashboard/summary", {
        params: {
          from,
          to,
        }
      });

      console.log(res.data);

      set({ summary: res.data.data });
    } catch (error) {
      console.error("Error in getDashboardSummary: ", error);
      set({ summary: null });
    } finally {
      set({ isFetchingDashboardData: false });
    }
  },

  getTransactionSummaryByCategory: async (from, to) => {
    set({ isFetchingDashboardData: true });
    try {
      const res = await api.get("/dashboard/category-summary", {
        params: {
          from,
          to,
        }
      });

      console.log(res.data);

      set({ categorySummary: res.data.data });
    } catch (error) {
      console.error("Error in getTransactionSummaryByCategory: ", error);
      set({ categorySummary: null });
    } finally {
      set({ isFetchingDashboardData: false });
    }
  },

  getMonthlyTrends: async () => {
    set({ isFetchingDashboardData: true });
    try {
      const res = await api.get("/dashboard/monthly-trends");

      console.log(res.data);

      set({ monthlyTrends: res.data.data });
    } catch (error) {
      console.error("Error in getMonthlyTrends: ", error);
      set({ monthlyTrends: null });
    } finally {
      set({ isFetchingDashboardData: false });
    }
  },

  getDailyTrends: async (month, year) => {
    set({ isFetchingDashboardData: true });
    try {
      const res = await api.get("/dashboard/daily-trends", {
        params: {
          month,
          year,
        }
      });

      console.log(res.data);

      set({ dailyTrends: res.data.data });
    } catch (error) {
      console.error("Error in getDailyTrends: ", error);
      set({ dailyTrends: null });
    } finally {
      set({ isFetchingDashboardData: false });
    }
  },

  getRecentTransactions: async (limit?: number) => {
    set({ isFetchingDashboardData: true });
    try {
      const limitS = String(limit)
      const res = limit ? await api.get("/dashboard/recent", {
        params: {
          limitS,
        } 
      }) : await api.get("/dashboard/recent");

      console.log(res.data);

      set({ recentTransactions: res.data.data });
    } catch (error) {
      console.error("Error in getRecentTransactions: ", error);
      set({ recentTransactions: null });
    } finally {
      set({ isFetchingDashboardData: false });
    }
  }
}))