import { useState } from "react";
import {
  Clock,Pencil,
} from "lucide-react";
import NavFooter from "@/components/NavFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";
import Sidebar from "@/components/Sidebar";
import useMeasure from "react-use-measure";

export default function BudgetsScreen() {
  const [ref, {width}] = useMeasure();
  const [budget] = useState({
    amount: 5000,
    remaining: 5000,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
    today: new Date("2025-06-06")
  });

  const totalDays =
    (budget.endDate.getTime() - budget.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  const currentDay =
    (budget.today.getTime() - budget.startDate.getTime()) / (1000 * 60 * 60 * 24);

  const percentageSpent =
    ((budget.amount - budget.remaining) / budget.amount) * 100;

  const daysLeft = Math.max(totalDays - Math.floor(currentDay), 0);
  const dailyLimit = daysLeft ? Math.floor(budget.remaining / daysLeft) : 0;

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

        <div className="bg-gradient-to-br from-[#B5C9FF] to-[#D5D5F7] text-black rounded-2xl px-4 pt-4 pb-6 shadow-md mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-lg font-bold">Month</p>
              <p className="text-xl font-semibold">
                ₹5000 <span className="text-gray-700 text-sm font-medium">left of ₹5000</span>
              </p>
            </div>
            <Clock className="w-5 h-5 text-black/60" />
          </div>

          <div className="relative mt-2 mb-1">
            <div className="flex justify-between text-xs text-gray-800 font-medium mb-1">
              <span>Jun 1</span>
              <span>Jun 30</span>
            </div>
            <div className="relative h-3 rounded-full bg-gray-300 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-black/90 rounded-full transition-all"
                style={{ width: `${percentageSpent}%` }}
              />
              <div
                className="absolute top-[-8px] h-6 w-[2px] bg-white left-[0%] rounded-full"
                style={{ left: `${(currentDay / totalDays) * 100}%` }}
              >
                <div className="absolute -top-6 -left-4 text-xs text-white bg-black px-2 py-0.5 rounded-full">
                  Today
                </div>
              </div>
            </div>
            <div className="text-sm text-center mt-2 font-semibold">{Math.floor(percentageSpent)}%</div>
          </div>

          <p className="text-center text-sm text-gray-700 mt-2">
            You should save <span className="font-medium text-black">₹{dailyLimit}</span>/day for {daysLeft} more days
          </p>
        </div>
    </motion.div>
   </motion.div>
  );
}
