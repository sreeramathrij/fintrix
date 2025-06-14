import { useEffect, useMemo } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";
import Sidebar from "@/components/Sidebar";
import useMeasure from "react-use-measure";
import BudgetSummaryCard from "@/components/BudgetSummaryCard";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import AddBudgetDrawerForm from "@/components/AddBudgetDrawer";

export default function BudgetsScreen() {
  const [ref, {width}] = useMeasure();
  
  const { budgets, getBudgetsByMonth, deleteBudget } = useBudgetStore();
  const { categories, getCategories } = useCategoryStore()

  const today = useMemo(()=>new Date(), []);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());
  const monthString = `${year}-${month}`;

  useEffect(() => {
    getBudgetsByMonth(monthString);
    getCategories();
  }, [])

  
  const categoryMap = useMemo(() => {
    if (!categories) return {};
    return Object.fromEntries(
      categories.map((c) => [c._id, c.name])
    );
  }, [categories]);


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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {budgets.map(budget =>
            <div className="hover:scale-105 transition-all duration-300">
              <BudgetSummaryCard
                month={budget.month}
                categoryId={budget.category} 
                title={budget.category
                ? `${new Date().toLocaleString("default", { month: "long" })} Expenses for ${categoryMap[budget.category]}`
                : `${new Date().toLocaleString("default", { month: "long" })} Expenses` }
                editable={true}
                onDelete={() => {
                  if (budget._id) {
                    deleteBudget(budget._id);
                  }
                }}
                />
            </div>
          )}
          <AddBudgetDrawerForm />
        </div>
    </motion.div>
   </motion.div>
  );
}
