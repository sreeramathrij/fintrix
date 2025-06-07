import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter
} from "lucide-react";
import NavFooter from "@/components/NavFooter";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [showFilters, setShowFilters] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-secondary text-primary px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-4">
          <ThemeToggle/>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => document.getElementById("searchInput")?.focus()}>
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

     

      {/* Filter Box (Placeholder) */}
      {showFilters && (
        <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700">
          <p className="mb-2 font-medium">Filters (Coming Soon)</p>
          {/* Add real filter options here */}
          <p className="text-xs text-gray-500">Example: Filter by type, amount, category...</p>
        </div>
      )}

      {/* Month Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {months.map((month) => (
          <button
            key={month}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedMonth === month
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center mt-16 text-center">
        <img
          src="/no-transactions.svg"
          alt="No transactions"
          className="w-64 h-64"
        />
        <p className="text-gray-400 mt-4">No transactions for {selectedMonth}.</p>
      </div>

     <NavFooter/>
    </div>
  );
}
