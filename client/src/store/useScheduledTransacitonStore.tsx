import { create } from "zustand";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface AddScheduledTransactionData {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  startDate: string;
  frequency: "daily" | "weekly" | "monthly";
}

interface ScheduledTransaction {
  _id: string;
  user: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  startDate: string;
  frequency: "daily" | "weekly" | "monthly";
  nextRun: string;
  active: boolean
  createdAt: string;
  updatedAt: string;
}

interface ScheduledTransactionStore {
  scheduledTransactions: ScheduledTransaction[] | null;

  createScheduledTransaction: (data: AddScheduledTransactionData) => void;
  getScheduledTransaction: () => void;
  toggleScheduledTransaction: (id: string) => void;
}

export const useScheduledTransactionStore = create<ScheduledTransactionStore>((set) => ({
  scheduledTransactions: null,

  createScheduledTransaction: async (data: AddScheduledTransactionData) => {
    try {
      const res = await api.post("/scheduled", data);
      set((state) => ({
        scheduledTransactions: state.scheduledTransactions
          ? [...state.scheduledTransactions, res.data.data]
          : [res.data.data],
      }));
      toast.success("Transaction Scheduled");
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || "Failed to schedule transaction");
    }
  },
  
  getScheduledTransaction: async () => {
    try {
      const res = await api.get("/scheduled");
      set({
        scheduledTransactions: res.data.data,
      })
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || "Failed to get scheduled Transaction")
    }
  },
  
  toggleScheduledTransaction: async (id: string) => {
    try {
      const res = await api.patch(`/scheduled/${id}/toggle`);
      const updatedTxn = res.data.scheduled;

      set((state) => ({
        scheduledTransactions: state.scheduledTransactions?.map((txn) =>
          txn._id === id ? updatedTxn : txn
        ) ?? [],
      }));
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || "Failed to toggle transaction");
    }
  }
}))