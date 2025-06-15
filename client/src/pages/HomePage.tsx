import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
//  Plus,
  BarChart2,
  Wallet,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";

import useMeasure from "react-use-measure"
import { motion } from "motion/react"

import { ThemeToggle } from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect, useMemo } from "react";
import AreaChartComponent from "@/components/AreaChartComponent";
import PieChartComponent from "@/components/PieChartComponent";
import RecentTransactions from "@/components/RecentTransactions";
import { useDesignStore } from "@/store/useDesignStore";
import BudgetSummaryCard from "@/components/BudgetSummaryCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useState } from "react";
//import AddTransactionDrawer from "@/components/AddTransactionDrawer";

export default function MobileHomePage() {
  const { authUser } = useAuthStore()
  const { budgetSummaries } = useBudgetStore();
  //const [showDrawer, setShowDrawer] = useState(false)
  const [filter, setFilter] = useState("all");
  const today = useMemo(()=>new Date(), []);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());
  const monthString = `${year}-${month}`;

  const { getMonthlyTrends } = useDashboardStore();
  const { setSelectedPage } = useDesignStore();

  const [ref, {width}] = useMeasure();

  useEffect(() => {
    getMonthlyTrends();
  }, [])

  return (
    <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: {duration: 2} }}
        className="max-h-screen overflow-y-auto flex flex-col overflow-x-hidden flex-1 bg-background text-foreground p-4 space-y-4 pb-28"
      >
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">What's up</p>
            <h1 className="text-2xl font-bold">{authUser?.name}</h1>
          </div>

          <div className="flex flex-col items-start sm:items-end space-y-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="flex flex-col md:flex-row gap-3">
          {!budgetSummaries ? (
              <Card className="size-full flex items-center justify-center hover:bg-accent transition-colors h-64">
                <CardContent className="p-0 text-center text-muted-foreground text-sm">
                  <Wallet size={20} className="mx-auto mb-1" />
                  Budget
                </CardContent>
              </Card>
          ): (
          <Link to="/budgets" className="flex-1 size-full">
            <BudgetSummaryCard month={monthString} title={`${today.toLocaleString("default", { month: "long"})} Expenses`} />
          </Link>
          )}
          {/* <Card className="flex-1 border-primary border-2 rounded-xl">
            <CardContent className="pt-4 pb-2 space-y-1">
              <div className="text-sm font-bold">Bank</div>
              <div className="text-xl font-semibold">₹0 INR</div>
              <div className="text-xs text-muted-foreground">0 transactions</div>
            </CardContent>
          </Card> */}
        </div>

        {/* Charts Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col flex-1 md:flex-row lg:flex-col gap-4 h-auto md:h-72">
            <Card className="w-full md:basis-2/3">
              <CardHeader className="flex items-center gap-2 pb-2">
                <CardTitle className="text-base">Spending Overview</CardTitle>
                <BarChart2 className="text-muted-foreground" size={18} />
              </CardHeader>
              <CardContent className="flex-1 relative h-64 md:h-64 px-2">
                  <AreaChartComponent />
              </CardContent>
            </Card>

            <Card className="w-full md:basis-1/3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Income vs Expense</CardTitle>
              </CardHeader>
              <CardContent className="h-64 md:h-48 flex items-center justify-center">
                <PieChartComponent />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-8 flex-1">
          {/* Tabs */}
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
          </Tabs>

          <RecentTransactions filter={filter} />
          <Link to="/transactions">
            <Button
              variant="outline"
              className="w-full"
              onClick={()=>{
                setSelectedPage("Transactions")
              }}
            >
              View All Transactions
            </Button>
          </Link>
          {/* <Button
            size="icon"
            onClick={() => setShowDrawer(true)}
            className="rounded-full w-14 h-14 fixed bottom-24 right-4 shadow-xl"
          >
            <Plus />
          </Button> */}
          </div>
        </div>
      </motion.div>
      {/* <AddTransactionDrawer open={showDrawer} setOpen={setShowDrawer} /> */}
    </motion.div>
  );
}
