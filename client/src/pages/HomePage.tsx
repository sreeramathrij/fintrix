import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Plus,
  Wallet,
  BarChart2
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"

import { Link } from "react-router-dom"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart as RePieChart,
  Pie,
  Cell,

} from "recharts"
import NavFooter from "@/components/NavFooter"

const spendingData = [
  { name: "Mon", amount: 200 },
  { name: "Tue", amount: 100 },
  { name: "Wed", amount: 350 },
  { name: "Thu", amount: 250 },
  { name: "Fri", amount: 400 },
  { name: "Sat", amount: 300 },
  { name: "Sun", amount: 150 },
]

const pieData = [
  { name: "Expense", value: 650 },
  { name: "Income", value: 950 },
]

const COLORS = ["#ef4444", "#22c55e"]



export default function MobileHomePage() {
  return (
    <div className="max-h-screen overflow-y-auto bg-background text-foreground p-4 space-y-4 pb-28">
      {/* Greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">What's up</p>
        <h1 className="text-2xl font-bold">Alwin Albert</h1>
      </div>

      {/* Quick Access Cards */}
       <div className="h-44 flex gap-3">
        <Link to="/budget" className="flex-1">
          <Card className="w-[100%] h-[100%] flex items-center justify-center hover:bg-accent transition-colors">
            <CardContent className="text-center text-muted-foreground text-sm">
              <Wallet size={20} className="mx-auto mb-1" />
              Budget
            </CardContent>
          </Card>
        </Link>
        <Card className="flex-1 border-primary border-2 rounded-xl">
          <CardContent className="pt-4 pb-2 space-y-1">
            <div className="text-sm font-bold">Bank</div>
            <div className="text-xl font-semibold">₹0 INR</div>
            <div className="text-xs text-muted-foreground">0 transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Account Summary */}
      <div className="flex gap-3">
        

      </div>
<div className="flex gap-4 h-72" >
      {/* Chart Section */}
      <Card className="flex-grow basis-2/3">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base">Spending Overview</CardTitle>
          <BarChart2 className="text-muted-foreground" size={18} />
        </CardHeader>
        <CardContent className="h-40 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/*piechart section*/ }
      <Card className="flex-grow basis-1/3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Income vs Expense</CardTitle>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
             
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      </div>

      {/* Transaction Filter */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
      </Tabs>

      <Button variant="outline" className="w-full">View All Transactions</Button>

      {/* Floating Add Button */}
      <Link to="/add">
        <Button size="icon" className="rounded-full w-14 h-14 fixed bottom-24 right-4 shadow-xl">
          <Plus />
        </Button>
      </Link>

      <NavFooter/>
      </div>
      
  )
}
