import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ScheduledPage() {
  const [period, setPeriod] = useState("Monthly")
  const [tab, setTab] = useState("All")

  const periods = ["Monthly", "Yearly", "Total"]
  const tabs = ["All", "Upcoming", "Overdue"]

  return (
    <div className="flex flex-col px-4 sm:px-6 pt-6 pb-24 items-center mx-auto w-full min-h-[100dvh] bg-background">
      {/* Header */}
      <div className="mb-6 w-full">
        <h1 className="text-2xl font-bold ">Scheduled</h1>
      </div>

      {/* Amount Summary */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold tracking-wide">₹0</div>
        <p className="text-sm text-muted-foreground">Averaged monthly upcoming</p>
      </div>

      {/* Period Filter */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition",
              period === p
                ? "bg-muted text-primary"
                : "bg-background border border-border text-muted-foreground"
            )}
          >
            {p}
          </button>
        ))}
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
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground mt-12 px-4">
        <img
          src="/no-transactions.png"
          alt="No transactions"
          className="w-56 h-56 sm:w-64 sm:h-64 object-contain mb-4"
        />
        <p className="text-sm">No transactions found.</p>
      </div>

      {/* Floating Add Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-2xl bg-muted text-foreground shadow-lg"
      >
        <Plus />
      </Button>
    </div>
  )
}
