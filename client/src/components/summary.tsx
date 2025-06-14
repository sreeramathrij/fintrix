import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar,Filter } from "lucide-react"
import { TransactionFilterDrawer } from "./TransactionFilterDrawer"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useMemo } from "react";
import TransactionList from "./TransactionList"
import { useTransactionsStore } from "@/store/useTranscationStore"
import { motion, AnimatePresence } from "motion/react"


type PayloadItem = {
  name: string;
  value: number;
  payload: {
    picture?: string;
  };
};

type Props = {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
};

const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0];
    const { name, value, payload: { picture } } = item;

    return (
    <AnimatePresence>
      {active && item && (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-background border border-muted p-2 rounded-lg shadow-lg text-sm space-x-2 flex items-center"
        >
          {item.payload.picture && (
            <img
              src={item.payload.picture}
              alt={item.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-muted-foreground">₹{item.value.toLocaleString()}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  }

  return null;
};

export default function SpendingSummary() {
 
  const [filterPeriod, setFilterPeriod] = useState("All Time")
  const [viewMode, setViewMode] = useState("expense")

  const { groupedTransactions, getTransactions } = useTransactionsStore();
  const {
    categorySummary,
    getTransactionSummaryByCategory,
    getRecentTransactions,
    getDashboardSummary,
    summary
  } = useDashboardStore();
  
  const today = new Date();
  const [from, setFrom] = useState(`${today.getFullYear() - 1}-${today.getMonth() + 1}-${today.getDate()}`)
  const [to, setTo] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
  
  useEffect(()=> {
    console.log(from, to);
    getRecentTransactions();
    getTransactionSummaryByCategory(from, to);
    getDashboardSummary(from, to);
    getTransactions({ from, to });
  }, [from, to])

  const pieData = categorySummary
                    ?.filter((item) => item.type === viewMode)
                    .map((item) => ({
                      name: item.name,
                      value: item.totalAmount,
                      picture: item.picture,
                    }))

  const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#0088fe", "#d0ed57"
  ];

  return (
    <div className="p-4 min-h-screen bg-background text-primary space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Spending</h1>
      </div>

      {/* Tabs for Current/History */}
      

      {/* Filter by Time */}
      <div className="flex items-center justify-between bg-muted p-2 rounded-xl">
        <Button variant="ghost" className="text-primary font-medium px-4 py-2 rounded-lg">
          <Calendar size={16} className="mr-2" /> {filterPeriod}
        </Button>
        <TransactionFilterDrawer
          onApply={({ dateRange }) => {
            if (dateRange?.from && dateRange?.to) {
              const fromStr = dateRange.from.toISOString().split("T")[0];
              const toStr = dateRange.to.toISOString().split("T")[0];

              setFrom(fromStr);
              setTo(toStr);

              const formatDate = (d: Date) =>
                `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;

              if (fromStr === toStr) {
                setFilterPeriod(`On ${formatDate(dateRange.from)}`);
              } else {
                setFilterPeriod(`${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`);
              }
            }
          }}
        />
      </div>

      {/* Net Total Card */}
      <Card className="bg-card text-center p-4 space-y-1">
        <p className="text-sm text-muted-foreground">Net Total</p>
        <p className="text-xl font-bold">₹{summary?.balance} INR</p>
        <p className="text-xs text-muted-foreground">{summary ? summary?.incomeCount + summary?.expenseCount : "0"} transactions</p>
      </Card>

      {/* Expense and Income Card */}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="bg-card p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold">Expense <span className="text-muted-foreground">(x{summary?.expenseCount})</span></p>
                <p className="text-red-500 font-bold">₹{summary ? summary.totalExpense : "0"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">Income <span className="text-muted-foreground">(x{summary?.incomeCount})</span></p>
                <p className="text-green-500 font-bold">₹{summary ? summary.totalIncome : "0"}</p>
              </div>
            </div>
          </Card>
          <div className="h-60 w-full mx-auto my-6">
            <Tabs defaultValue={viewMode} onValueChange={setViewMode} className="">
              <TabsList className="grid grid-cols-2 bg-muted rounded-xl">
                <TabsTrigger value="expense" className="text-red-400">Outgoing</TabsTrigger>
                <TabsTrigger value="income" className="text-green-400">Incoming</TabsTrigger>
              </TabsList>
            </Tabs>
            {pieData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    paddingAngle={3}
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-10">No data for {viewMode} yet.</div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          {groupedTransactions &&
            <TransactionList groupedTransactions={groupedTransactions} editable={false} />
          }
        </div>
      </div>
    </div>
  )
}
