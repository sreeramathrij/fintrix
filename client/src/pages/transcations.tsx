import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { getMonthStartAndEnd } from "@/lib/dateUtils"
import { useTransactionsStore } from "@/store/useTranscationStore";
import TransactionList from "@/components/TransactionList";
import { useMemo } from "react";
import AddTransactionDrawer from "@/components/AddTransactionDrawer";


// Helper to get month names
const getLast12Months = (): { label: string; month: number; year: number }[] => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.unshift({
      label: date.toLocaleString("default", { month: "long" }),
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  }
  return months;
};



export default function TransactionsScreen() {
  const [showDrawer, setShowDrawer] = useState(false)
 const [searchTerm, setSearchTerm] = useState("");

  const monthList = useMemo(() => getLast12Months(), []);

  const currentMonthIndex = monthList.findIndex(
    (m) => m.month === new Date().getMonth() && m.year === new Date().getFullYear()
  );
  const {getTransactions,groupedTransactions}=useTransactionsStore();

  const [selectedIndex, setSelectedIndex] = useState(currentMonthIndex);
   const selectedMonth = useMemo(() => monthList[selectedIndex], [selectedIndex, monthList]);

  const filteredTransactions = useMemo(() => {
  if (!groupedTransactions) return [];

  return groupedTransactions
    .map(group => ({
      ...group,
      transactions: group.transactions.filter(tx =>
        tx.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(group => group.transactions.length > 0); // remove empty groups
}, [searchTerm, groupedTransactions]);

  
  
  
  useEffect(() => {
  const { startDate, endDate } = getMonthStartAndEnd(
    selectedMonth.year,
    selectedMonth.month
  );
  const range = {
    from:startDate.toISOString().split("T")[0],
    to:endDate.toISOString().split("T")[0]
  }
  getTransactions(range);
}, [selectedMonth]);


  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div className="min-h-screen flex-1 bg-background text-primary py-6 p-4 pb-28 relative space-y-4">
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
                    className="pl-10 pr-3 py-2 w-64 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

            </div>
            <ThemeToggle />
           <Button
                size="icon"
                onClick={() => setShowDrawer(true)}
                className="rounded-full w-14 h-14 fixed bottom-24 right-4 shadow-xl">
                <Plus />
              </Button>
          </div>
        </div>

        {/* Month Selector (Dynamic) */}
        <div className="flex overflow-x-auto gap-4 scrollbar-hide border-b border-muted-foreground/20 pb-2">
          {monthList.map((m, index) => (
            <button
              key={`${m.label}-${m.year}`}
              onClick={() => setSelectedIndex(index)}
              className={`flex-1 text-sm font-medium px-2 py-1 whitespace-nowrap transition-all ${
                selectedIndex === index
                  ? "text-white border-b-2 border-white"
                  : "text-muted-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredTransactions && filteredTransactions.length > 0 ? (
  <TransactionList groupedTransactions={filteredTransactions} editable={true} />
) : (
  <div className="flex flex-col items-center justify-center h-full mt-20 text-muted-foreground">
    <img
      src="/no-transactions.png"
      alt="No transactions"
      width={250}
      height={250}
      className="mb-4 opacity-70"
    />
    <p className="text-sm">No transactions for {selectedMonth.label}.</p>
  </div>
)}
      </motion.div>
      <AddTransactionDrawer open={showDrawer} setOpen={setShowDrawer} />
    </motion.div>
  );
}
