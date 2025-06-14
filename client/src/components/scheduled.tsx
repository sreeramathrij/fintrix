import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { AddScheduledTransactionDrawer } from "./AddScheduledDrawer"
import { useScheduledTransactionStore } from "@/store/useScheduledTransacitonStore"
import BackButton from "./BackButton"

export default function ScheduledPage() {
  const [tab, setTab] = useState("All")

  const tabs = ["All", "Upcoming", "Overdue"]
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { scheduledTransactions, getScheduledTransaction, toggleScheduledTransaction } = useScheduledTransactionStore();


  const handleToggle = async (id: string) => {
  try {
    setLoadingId(id);
    await toggleScheduledTransaction(id); // wait for it to finish
  } catch (err) {
    console.error("Toggle failed:", err);
  } finally {
    setLoadingId(null);
  }
};

  useEffect(() => {
    getScheduledTransaction();
  }, []);

  return (
   
      
    <div className="flex flex-col px-4 sm:px-6 pt-6 pb-24 items-center mx-auto w-full min-h-[100dvh] bg-background">
      {/* Header */}
      <div className="relative mb-4 w-full">
        <div className="relative right-4 pb-4">
        <BackButton/>
        </div>
        <h1 className="text-2xl font-bold ">Scheduled</h1>
      </div>

      {/* Amount Summary */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold tracking-wide">₹0</div>
        <p className="text-sm text-muted-foreground">Averaged monthly upcoming</p>
      </div>

      {/* Tab Selector */}
      <div className="w-[80%] flex items-center justify-center gap-2 mb-6">
        <div className="flex flex-1 bg-muted min-w-md max-w-lg rounded-full overflow-hidden">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 text-sm py-2 font-medium transition-all",
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        
      </div>

      {/* Empty State */}
      {scheduledTransactions && scheduledTransactions.length > 0 ? scheduledTransactions?.map((txn) => (
        <div key={txn._id} className="w-full flex justify-between items-center bg-muted p-4 rounded-lg mb-2">
          <div>
            <p className="font-semibold">{txn.title}</p>
            <p className="text-sm text-muted-foreground">₹{txn.amount} | Next payment - {`${new Date(txn.nextRun).toLocaleString("en-US", {year:"numeric", month: "long", day: "numeric"})}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={txn.active}
              onCheckedChange={() => handleToggle(txn._id)}
              disabled={loadingId === txn._id}
            />
          </div>
        </div>
      )) : 
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground mt-12 px-4">
          <img
            src="/no-transactions.png"
            alt="No transactions"
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain mb-4"
          />
          <p className="text-sm">No transactions found.</p>
        </div>
      }

      {/* Floating Add Button */}
      <AddScheduledTransactionDrawer />
    </div>
    
  )
}
