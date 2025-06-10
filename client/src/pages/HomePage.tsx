import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Plus,
  Wallet,
  BarChart2,
  UserPlus,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";

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
} from "recharts";
import useMeasure from "react-use-measure"
import { motion } from "motion/react"
import NavFooter from "@/components/NavFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar";

const spendingData = [
  { name: "Mon", amount: 200 },
  { name: "Tue", amount: 100 },
  { name: "Wed", amount: 350 },
  { name: "Thu", amount: 250 },
  { name: "Fri", amount: 400 },
  { name: "Sat", amount: 300 },
  { name: "Sun", amount: 150 },
];

const pieData = [
  { name: "Expense", value: 650 },
  { name: "Income", value: 950 },
];

const COLORS = ["#ef4444", "#22c55e"];

export default function MobileHomePage() {
  const [ref, {width}] = useMeasure();

  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: {duration: 2} }}
        className="max-h-screen overflow-y-auto overflow-x-hidden flex-1 bg-background text-foreground p-4 space-y-4 pb-28"
      >
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">What's up</p>
            <h1 className="text-2xl font-bold">Alwin Albert</h1>
          </div>

          <div className="flex flex-col items-start sm:items-end space-y-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="flex flex-col md:flex-row gap-3 h-auto md:h-44">
          <Link to="/budget" className="flex-1">
            <Card className="w-full h-full flex items-center justify-center hover:bg-accent transition-colors">
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

        {/* Charts Section */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-72">
          <Card className="w-full md:basis-2/3">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-base">Spending Overview</CardTitle>
              <BarChart2 className="text-muted-foreground" size={18} />
            </CardHeader>
            <CardContent className="h-64 md:h-40 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="w-full md:basis-1/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Income vs Expense</CardTitle>
            </CardHeader>
            <CardContent className="h-64 md:h-48 flex items-center justify-center">
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
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" className="w-full">
          View All Transactions
        </Button>

        {/* Floating Add Button */}
        <Link to="/add">
          <Button
            size="icon"
            className="rounded-full w-14 h-14 fixed bottom-24 right-4 shadow-xl"
          >
            <Plus />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
