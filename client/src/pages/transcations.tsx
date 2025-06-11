import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import useMeasure from "react-use-measure";
import Sidebar from "@/components/Sidebar";
import { useTransactionsStore } from "../store/useTranscationStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Pen, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";



export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showFormDrawer, setShowFormDrawer] = useState(false);
  const [ref, { width }] = useMeasure();

  const {
    transactions,
    getTransactions,
    isFetchingTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
  } = useTransactionsStore();

  const { categories, getCategories } = useCategoryStore();

  const [form, setForm] = useState({
    amount: "",
    type: "income",
    description: "",
    date: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  const formatted = {
    ...form,
    amount: Number(form.amount),
    date: new Date(form.date).toISOString().split("T")[0],
  };

  console.log(formatted);

  if (selectedTransaction) {
    await editTransaction(selectedTransaction._id, formatted);
  } else {
    await addTransaction(formatted);
  }

  setForm({ amount: "", type: "income", description: "", date: "", category: "" });
  setSelectedTransaction(null);
  setShowFormDrawer(false);
  getTransactions(); // Refresh the transactions list
};

  const handleEdit = (id: string) => {
  const tx = transactions?.find((t) => t._id === id);
  if (!tx) return;

  let parsedDate = "";

  try {
    const dateObj = new Date(tx.date); // works whether it's a string or number
    if (!isNaN(dateObj.getTime())) {
      parsedDate = dateObj.toISOString().split("T")[0];
    } else {
      console.error("Invalid date format in transaction:", tx.date);
    }
  } catch (error) {
    console.error("Error parsing date:", error);
  }

  setForm({
    amount: String(tx.amount),
    type: tx.type,
    description: tx.description,
    date: parsedDate,
    category: tx.category,
  });

  setSelectedTransaction(tx as any);
  setShowFormDrawer(true);
};


  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    getTransactions(); // Refresh the transactions list
  };

  // Inside your component
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  // Dynamically extract months from transactions
  const [searchTerm, setSearchTerm] = useState("");

  const availableMonths = useMemo(() => {
    if (!transactions) return [];

    const uniqueMonths = new Set<string>();

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date); // assuming tx.date is ISO string
      if (!isNaN(txDate.getTime())) {
        uniqueMonths.add(monthFormatter.format(txDate));
      }
    });

    return Array.from(uniqueMonths);
  }, [transactions]);

  useEffect(() => {
    getTransactions();
    getCategories();
  
  }, []);
  useEffect(()=>{
    console.log(categories)
  },[categories])

  const filteredTransactions = transactions?.filter(tx => {
  const txDate = new Date(tx.date);
  const monthName = txDate.toLocaleString("default", { month: "long" });

  const matchesMonth = monthName === selectedMonth;
  const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesMonth && matchesSearch;
});

  

  useEffect(() => {
    if (availableMonths && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths]);

  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: { duration: 2 } }}
        className="min-h-screen flex-1 bg-background text-primary py-6 p-4 space-y-4 pb-28 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
  <h1 className="text-2xl font-bold">Transactions</h1>
  <div className="flex gap-2 flex-wrap items-center">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        id="searchInput"
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-3 py-2 w-64 text-sm"
      />
    </div>
    <ThemeToggle />
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setShowFilters(!showFilters)}
    >
      <Filter className="w-5 h-5" />
    </Button>
    <Button onClick={() => setShowFormDrawer(true)}>
      Add Transaction
    </Button>
  </div>
</div>

        {/* Month Tabs */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-0 w-full">
            {availableMonths.length > 0 ? (
              availableMonths.map((month) => (
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
              ))
            ) : (
              <p className="text-muted-foreground text-sm px-3 py-1">No months yet</p>
            )}
          </div>
        </div>

        {/* Conditional render */}
        {isFetchingTransactions ? (
          <p className="text-center text-muted-foreground">Loading transactions...</p>
        ) : filteredTransactions?.length > 0 ? (
          <>
            <div className="space-y-4 mt-6">
              {filteredTransactions.map(tx => {
                const category = categories?.find(cat => cat._id === tx.category);
                return (
                  <div
                    key={tx._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{tx.amount} • {tx.type} •{" "}
                        {new Date(tx.date).toLocaleDateString()}
                        {category ? ` • ${category.name}` : ""}
                      </p>
                    </div>
                    <div className="space-x-2 flex items-center">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleEdit(tx._id)}
          className="text-primary"
        >
          <Pen className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit Transaction</TooltipContent>
    </Tooltip>
    
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleDelete(tx._id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete Transaction</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>

                  </div>
                );
              })}
            </div>
          </>
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

        {/* Transaction Form Drawer */}
        <AnimatePresence>
          {showFormDrawer && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setShowFormDrawer(false)}
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="fixed bottom-0 left-0 right-0 bg-background shadow-lg z-50 p-6 rounded-t-2xl border-t"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFormDrawer(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    type="number"
                  />
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="bg-background w-full border p-2 rounded"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <Input
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    className="bg-background text-primary"
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="bg-background w-full border p-2 rounded"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.picture ?(<><img src={cat.picture}/>{cat.name}</>)  : cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmit} className="flex-1">
                      {selectedTransaction ? "Update" : "Add"} Transaction
                    </Button>
                    {selectedTransaction && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedTransaction(null);
                          setForm({
                            amount: "",
                            type: "income",
                            description: "",
                            date: "",
                            category: "",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}