import { useState } from "react";
import {
  Pencil,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";
import Sidebar from "@/components/Sidebar";
import useMeasure from "react-use-measure";
import BudgetSummaryCard from "@/components/BudgetSummaryCard";

export default function BudgetsScreen() {
  const [ref, {width}] = useMeasure();
  

  return (
    
    <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: {duration: 2} }}
        className="min-h-screen flex-1 bg-background text-primary px-4 py-6 pb-32 sm:px-6 md:px-8"
      >
        <div className="relative mb-6 flex justify-between items-start">
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle/>
          <button className=" p-2 rounded-full hover:bg-black/10 transition">
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        </div>

        <BudgetSummaryCard month="2025-06"/>
    </motion.div>
   </motion.div>
  );
}
