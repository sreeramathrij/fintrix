import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { useBudgetStore } from "@/store/useBudgetStore";
import { Loader2, Trash2, Wallet } from "lucide-react";
import { useEffect } from "react";

interface BudgetSummaryProps {
  month: string; // "2025-06"
  categoryId?: string;
  title?: string;
  showProgress?: boolean;
  showDailyTip?: boolean;
  editable?: boolean;
  onDelete?: () => void;
}

const BudgetSummaryCard = ({
  month,
  categoryId,
  title,
  showProgress = true,
  showDailyTip = true,
  editable = false,
  onDelete,
}: BudgetSummaryProps) => {
  const { getBudgetSummaryByMonth, budgetSummaries, isFetchingBudgetSummary  } = useBudgetStore();

  useEffect(() => {
    categoryId ? getBudgetSummaryByMonth(month, categoryId) : getBudgetSummaryByMonth(month);
  }, [month, categoryId]);

  const summaryKey = `${month}-${categoryId ?? "all"}`;
  const budgetSummary = budgetSummaries[summaryKey];
  
  useEffect(() => {
    categoryId
      ? getBudgetSummaryByMonth(month, categoryId)
      : getBudgetSummaryByMonth(month);
  }, [month, categoryId]);

  if (isFetchingBudgetSummary && !budgetSummary)
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );

  if (!budgetSummary) {
    return (
      <Card className="size-full flex items-center justify-center hover:bg-accent transition-colors h-64">
        <CardContent className="p-0 text-center text-muted-foreground text-sm">
          <Wallet size={20} className="mx-auto mb-1" />
          No budget data
        </CardContent>
      </Card>
    );
  }

  const { totalBudget, totalSpent } = budgetSummary;
  const remaining = totalBudget - totalSpent;
  const percentSpent = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(0);

  const today = new Date();
  const day = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = daysInMonth - day;
  const dailyLimit = daysRemaining > 0 ? (remaining / daysRemaining).toFixed(0) : "0";

  return (
      <Card className="size-full flex flex-col justify-between h-fit overflow-hidden border-2 border-dashed bg-popover rounded-md transition-colors">
        <CardHeader className="flex items-start justify-between bg-gradient-to-br from-sky-500 to-indigo-500 text-primary">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold">{title ?? "Budget Summary"}</CardTitle>
            <p className="text-sm">{`₹${remaining} left of ₹${totalBudget}`}</p>
          </div>
          {editable && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-sm text-background hover:text-red-500 hover:scale-105 transition-all duration-300">
                  <Trash2 size={36}/>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Budget?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove the budget and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (onDelete) onDelete();
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardHeader>
        <CardContent className="p-8 text-sm text-muted-foreground">
          {showProgress && (
          <>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${percentSpent}%` }}
              />
              <div
                className="absolute top-0 left-[var(--today)] w-0.5 h-full bg-slate-900"
                style={{
                  "--today": `${(day / daysInMonth) * 100}%`,
                } as React.CSSProperties}
              />
            </div>
            <div className="relative flex justify-between text-xs mt-1">
              <span>Jun 1</span>
              <span
                className="absolute text-xs font-medium text-indigo-600 transition-all duration-300"
                style={{
                  left: `calc(${percentSpent}% - 12px)`,
                  whiteSpace: "nowrap",
                }}
              >
                {percentSpent}%
              </span>
              <span>Jun {daysInMonth}</span>
            </div>
          </>
        )}
        {showDailyTip && (
          <p className="text-xs text-center my-1">
            You can spend ₹{dailyLimit}/day for {daysRemaining} more days
          </p>
        )}
        </CardContent>
      </Card>
  );
};

export default BudgetSummaryCard;