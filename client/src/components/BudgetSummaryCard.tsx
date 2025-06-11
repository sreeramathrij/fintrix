import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useBudgetStore } from "@/store/useBudgetStore";
import { Loader2, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BudgetSummaryCard = () => {
  const { getBudgetSummaryByMonth, budgetSummary, isFetchingBudget } = useBudgetStore();

  const today = useMemo(()=>new Date(), []);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());
  const monthString = `${year}-${month}`;

  useEffect(() => {
    console.log()
    getBudgetSummaryByMonth(monthString);
  }, [monthString]);

  useEffect(() => {
    console.log(budgetSummary);
  }, [budgetSummary])

  if (isFetchingBudget)
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );

  if (!budgetSummary)
    return (
      <Link to="/budget" className="flex-1 size-full">
        <Card className="size-full flex items-center justify-center hover:bg-accent transition-colors">
          <CardContent className="p-0 text-center text-muted-foreground text-sm">
            <Wallet size={20} className="mx-auto mb-1" />
            Budget
          </CardContent>
        </Card>
      </Link>
    );

  const { totalBudget, totalSpent } = budgetSummary;
  const remaining = totalBudget - totalSpent;
  const percentSpent = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(0);

  const day = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = daysInMonth - day;
  const dailyLimit = daysRemaining > 0 ? (remaining / daysRemaining).toFixed(0) : "0";

  return (
    <Link to="/budget" className="flex-1 size-full">
      <Card className="size-full flex flex-col justify-between rounded-md overflow-hidden hover:bg-accent transition-colors">
        <CardHeader className="flex flex-col basis-1/3 items-start justify-center bg-gradient-to-br from-sky-500 to-indigo-500 text-primary">
          <CardTitle className="text-lg font-bold">June Expenses</CardTitle>
          <p className="text-sm">{`₹${remaining} left of ₹${totalBudget}`}</p>
        </CardHeader>
        <CardContent className="p-4 text-sm text-muted-foreground">
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${percentSpent}%` }}
            />
            <div
              className="absolute top-0 left-[var(--today)] w-0.5 h-full bg-slate-900"
              style={{ "--today": `${(day / daysInMonth) * 100}%` } as React.CSSProperties}
            />
          </div>
          <div className="relative flex justify-between text-xs mt-1">
            <span>Jun 1</span>
            <span
              className="absolute text-xs font-medium text-indigo-600 transition-all duration-300"
              style={{
                left: `calc(${percentSpent}% - 12px)`, // adjust 12px to center the label better
                whiteSpace: "nowrap",
              }}
            >
              {percentSpent}%
            </span>
            <span>Jun {daysInMonth}</span>
          </div>
          <p className="text-xs text-center mt-2">
            You can spend ₹{dailyLimit}/day for {daysRemaining} more days
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BudgetSummaryCard;