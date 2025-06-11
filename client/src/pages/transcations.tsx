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
  

  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div
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
                value=""
                onChange={(e) => {}}
                className="pl-10 pr-3 py-2 w-64 text-sm"
              />
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button onClick={() => {}}>
              Add Transaction
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}