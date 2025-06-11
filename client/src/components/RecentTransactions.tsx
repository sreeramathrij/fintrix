import { useDashboardStore } from "@/store/useDashboardStore";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";

const RecentTransactions = () => {
  const {
    recentTransactions,
    getRecentTransactions,
    isFetchingDashboardData
  } = useDashboardStore();

  useEffect(() => {
    getRecentTransactions();
  }, [])

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof recentTransactions> = {};

    recentTransactions?.forEach((tx) => {
      const dateKey = format(new Date(tx.date), "MMMM d, yyyy");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
    });

    // Sort by newest date first
    return Object.entries(groups).sort(
      (a, b) =>
        new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  }, [recentTransactions]);

  if(isFetchingDashboardData) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={20} className="animate-spin" />
      </div>
    )
  }


  if (!recentTransactions || recentTransactions.length === 0) {
    return (
      <div className="mt-2">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-sm text-muted-foreground">No transactions yet.</p>
      </div>
    );
  }

  return (
    recentTransactions && (
    <div className="space-y-4 mt-2">
      <h2 className="text-lg font-semibold">Recent Transactions</h2>

      {groupedTransactions.map(([date, transactions]) => (
        <div key={date} className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">{date}</h3>
          <div className="space-y-2">
            {transactions?.map((tx) => (
              <div
                key={tx._id}
                className="flex h-16 items-center justify-between rounded-md py-2 px-4 bg-card shadow-sm"
              >
                {/* Left: image and description */}
                <div className="flex items-center gap-3">
                  <img
                    src={tx.category.picture}
                    alt={tx.category.name}
                    className="size-14 object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">{tx.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {tx.category.name}
                    </div>
                  </div>
                </div>

                {/* Right: amount */}
                <div
                  className={`font-semibold text-md ${
                    tx.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>)
  );
};

export default RecentTransactions;