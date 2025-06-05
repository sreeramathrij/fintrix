import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Plus, BarChart2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted px-4 py-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button className="gap-2">
            <Plus size={18} /> Add Transaction
          </Button>
        </header>

        {/* Balance Summary */}
        <Card className="bg-background shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">₹12,480.00</CardContent>
        </Card>

        {/* Income & Expense Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-green-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-green-600 text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="text-green-600" />
            </CardHeader>
            <CardContent className="text-xl font-semibold text-green-700">
              ₹8,000.00
            </CardContent>
          </Card>

          <Card className="border-red-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-red-600 text-sm font-medium">Expenses</CardTitle>
              <ArrowDownLeft className="text-red-600" />
            </CardHeader>
            <CardContent className="text-xl font-semibold text-red-700">
              ₹3,200.00
            </CardContent>
          </Card>
        </div>

        {/* Charts and Stats */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium">Spending Overview</CardTitle>
            <BarChart2 className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center text-muted">[Chart Placeholder]</div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center border-b pb-2 last:border-none"
              >
                <div>
                  <div className="font-medium">Groceries</div>
                  <div className="text-xs text-muted-foreground">Jun 4, 2025</div>
                </div>
                <div className="text-red-600 font-semibold">- ₹550</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
