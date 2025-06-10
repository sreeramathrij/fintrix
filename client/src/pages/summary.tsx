import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, History, Filter } from "lucide-react"

export default function SpendingSummary() {
  const [activeTab, setActiveTab] = useState("current")
  const [filterPeriod, setFilterPeriod] = useState("All Time")
  const [viewMode, setViewMode] = useState("outgoing")

  return (
    <div className="p-4 min-h-screen bg-background text-primary space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Spending</h1>
      </div>

      {/* Tabs for Current/History */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 bg-muted rounded-xl">
          <TabsTrigger value="current" className="py-2"><Calendar className="inline mr-2" size={16} />Current</TabsTrigger>
          <TabsTrigger value="history" className="py-2"><History className="inline mr-2" size={16} />History</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filter by Time */}
      <div className="flex items-center justify-between bg-muted p-2 rounded-xl">
        <Button variant="ghost" className="text-primary font-medium px-4 py-2 rounded-lg">
          <Calendar size={16} className="mr-2" /> {filterPeriod}
        </Button>
        <Button size="icon" variant="ghost">
          <Filter size={20} />
        </Button>
      </div>

      {/* Net Total Card */}
      <Card className="bg-card text-center p-4 space-y-1">
        <p className="text-sm text-muted-foreground">Net Total</p>
        <p className="text-xl font-bold">₹0 INR</p>
        <p className="text-xs text-muted-foreground">0 transactions</p>
      </Card>

      {/* Expense and Income Card */}
      <Card className="bg-card p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">Expense <span className="text-muted-foreground">(x0)</span></p>
            <p className="text-red-500 font-bold">₹0</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Income <span className="text-muted-foreground">(x0)</span></p>
            <p className="text-green-500 font-bold">₹0</p>
          </div>
        </div>
      </Card>

      {/* View Mode Tabs */}
      <Tabs defaultValue={viewMode} onValueChange={setViewMode} className="">
        <TabsList className="grid grid-cols-2 bg-muted rounded-xl">
          <TabsTrigger value="outgoing" className="text-red-400">Outgoing</TabsTrigger>
          <TabsTrigger value="incoming" className="text-green-400">Incoming</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Placeholder Graph */}
      <div className="h-40 w-40 mx-auto my-6 bg-muted rounded-full flex items-center justify-center">
        <div className="h-24 w-24 bg-background rounded-full"></div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="w-12 h-12 rounded-full shadow-xl" size="icon">
          +
        </Button>
      </div>
    </div>
  )
}
