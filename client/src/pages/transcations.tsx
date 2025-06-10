import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import useMeasure from "react-use-measure";
import Sidebar from "@/components/Sidebar";
import { useTransactionsStore } from "../store/useTranscationStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import TransactionsPage from "@/components/transpg";

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [showFilters, setShowFilters] = useState(false);
  const [ref, { width }] = useMeasure();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const {
    transactions,
    getTransactions,
    isFetchingTransactions,
  } = useTransactionsStore();

  const {
    categories,
    getCategories,
  } = useCategoryStore(); 

  let filteredTransactions = transactions?.filter(tx => {
    const txDate = new Date(Number(tx.date));
    const monthName = txDate.toLocaleString("default", { month: "long" });
    return monthName === selectedMonth;
  });

  useEffect(() => {
    getTransactions();
    getCategories();
    if(transactions) {
     filteredTransactions = transactions?.filter(tx => {
    const txDate = new Date(Number(tx.date));
    const monthName = txDate.toLocaleString("default", { month: "long" });
    return monthName === selectedMonth;
  });
    }
    console.log(filteredTransactions)
  }, [getTransactions, getCategories,categories]);
  

  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: { duration: 2 } }}
        className="min-h-screen flex-1 bg-background text-primary py-6 p-4 space-y-4 pb-28"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className="flex gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => document.getElementById("searchInput")?.focus()}>
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filter Box */}
        {showFilters && (
          <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700">
            <p className="mb-2 font-medium">Filters (Coming Soon)</p>
            <p className="text-xs text-gray-500">Example: Filter by type, amount, category...</p>
          </div>
        )}

        {/* Month Tabs */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-0 w-[100%]">
            {months.map((month) => (
              <button
                key={month}
                className={`flex-1 whitespace-nowrap px-3 py-1 text-sm font-medium transition hover:bg-secondary ${
                  selectedMonth === month
                    ? "bg-muted-foreground text-primary"
                    : "bg-background text-primary"
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4 mt-6">
          {isFetchingTransactions ? (
            <p className="text-center text-muted-foreground">Loading transactions...</p>
          ) : (
            <>
              {filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map(tx => {
                  const category = categories?.find(cat => cat._id === tx.category); // Optional: Match category
                  return (
                    <div
                      key={tx._id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{tx.amount} • {tx.type} •{" "}
                          {new Date(Number(tx.date)).toLocaleDateString()}
                          {category ? ` • ${category.name}` : ""}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center mt-16 text-center">
                  <img
                    src="/no-transactions.png"
                    alt="No transactions"
                    className="w-64 h-64"
                  />
                  <p className="text-gray-400 mt-4">
                    No transactions for {selectedMonth}.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom component */}
        <div>
  
        </div>
      </motion.div>
    </motion.div>
  );
}
