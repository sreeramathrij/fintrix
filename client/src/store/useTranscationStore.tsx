import { create } from "zustand";
import { api } from "@/lib/axios";
import toast from "react-hot-toast"
import { AxiosError } from "axios";

interface TransactionData {
    amount: number,
    type: string,
    description: string,
    date: string,
    category: string,
}

interface Transactions {
    _id: string,
    amount: number,
    type: string,
    date: string,
    description: string,
    category: string,
    user: string,
    createdAt: string,
    updatedAt: string,
}

interface oneTransaction {
    _id: string,
    amount: number,
    type: string,
    date: string,
    description: string,
    category: {
        _id: string,
        name: string,
        type: "income" | "expense",
        picture: string,
        createdBy: string | null,
    }
    user: string,
    createdAt: string,
    updatedAt: string,
}

interface getTransactionsParams{
    from:string,
    to:string,
}

interface DailyTransactions{
    _id:string,
    totalIncome:number,
    totalExpense:number,
    transactions:oneTransaction[],
}

interface TransactionsStore {
    transactions: Transactions[] | null;
    groupedTransactions: DailyTransactions[] | null
    selectedTransaction: oneTransaction | null;
    isFetchingTransactions: boolean;
    getTransactions: (range?:getTransactionsParams) => Promise<void>;
    addTransaction: (data: TransactionData) => Promise<void>;
    editTransaction: (id: string, data: TransactionData) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    setSelectedTransaction: (transaction: oneTransaction | null) => void;
}

export const useTransactionsStore = create<TransactionsStore>((set, _get) => ({
    transactions: null,
    selectedTransaction: null,
    groupedTransactions:null,
    isFetchingTransactions: false,

    setSelectedTransaction: (transaction) => {
        set({ selectedTransaction: transaction });
    },

    getTransactions: async (range?:getTransactionsParams) => {
        set({ isFetchingTransactions: true });
        try {
    
            if(range){
                const response = await api.get("/transactions",{
                params:{
                    from:range.from,
                    to:range.to
                }
            })
            set({ groupedTransactions: response.data.data });
            

            }else{
                const response =  await api.get("/transactions")
                set({ transactions: response.data.data });
            }
            
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Error fetching transactions:", axiosError);
            toast.error("Failed to fetch transactions");
        } finally {
            set({ isFetchingTransactions: false });
        }
    },

    addTransaction: async (data: TransactionData) => {
  try {
    const response = await api.post("/transactions", data);
    const newTransaction = response.data.data;

    set((state) => {
      // Update flat list
      const updatedTransactions = state.transactions
        ? [...state.transactions, newTransaction]
        : [newTransaction];

      // Grouping logic
      const transactionDate = newTransaction.date.split("T")[0]; // e.g., "2025-06-11"
      let grouped = state.groupedTransactions ? [...state.groupedTransactions] : [];

      const groupIndex = grouped.findIndex((group) => group._id === transactionDate);

      if (groupIndex !== -1) {
        // Add to existing group
        grouped[groupIndex].transactions.push(newTransaction);
      } else {
        // Create new group
        grouped.push({
            _id: transactionDate,
            transactions: [newTransaction],
            totalIncome:newTransaction.type==="income"? newTransaction.amount:0,
            totalExpense: newTransaction.type==="expense"? newTransaction.amount:0
        });
      }

      return {
        transactions: updatedTransactions,
        groupedTransactions: grouped,
      };
    });

    toast.success("Transaction added successfully");
    return newTransaction;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error adding transaction:", axiosError);
    toast.error("Failed to add transaction");
    throw error;
  }
},


    editTransaction: async (id: string, data: TransactionData) => {
        try {

             const response=await api.put(`/transactions/${id}`, data);
            const updatedTransaction = response.data.updatedTransaction;
            
            set((state) => {
      // Filter from flat transaction list
      const updatedTransactions = state.transactions?.map(transaction =>
        transaction._id === id ? updatedTransaction:transaction
      ) || null;

      // Filter from grouped transactions
      const updatedGrouped = state.groupedTransactions
        ?.map(group => ({
          ...group,
          transactions: group.transactions.map(tx => tx._id === id?updatedTransaction:tx)
        }))
        .filter(group => group.transactions.length > 0) || null;

      return {
        transactions: updatedTransactions,
        groupedTransactions: updatedGrouped,
        selectedTransaction: null
      };
    });

            toast.success("Transaction updated successfully");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Error updating transaction:", axiosError);
            toast.error("Failed to update transaction");
            throw error;
        }
    },

   deleteTransaction: async (id: string) => {
  try {
    await api.delete(`/transactions/${id}`);

    set((state) => {
      // Filter from flat transaction list
      const updatedTransactions = state.transactions?.filter(
        transaction => transaction._id !== id
      ) || null;

      // Filter from grouped transactions
      const updatedGrouped = state.groupedTransactions
        ?.map(group => ({
          ...group,
          transactions: group.transactions.filter(tx => tx._id !== id)
        }))
        .filter(group => group.transactions.length > 0) || null;

      return {
        transactions: updatedTransactions,
        groupedTransactions: updatedGrouped,
        selectedTransaction: null
      };
    });

    toast.success("Transaction deleted successfully");
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error deleting transaction:", axiosError);
    toast.error("Failed to delete transaction");
    throw error;
  }
}

}));