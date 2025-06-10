
import { useState } from "react"
import { Plus,  Car } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Progress } from "@/components/ui/progress"
import GoalForm from "@/components/goalform"

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {
      name: "Trip Savings Jar",
      date: "May 1",
      transactions: 13,
      currentAmount: 195,
      goalAmount: 1500,
      
    },
    {
      name: "Car Loan Payment",
      date: "May 31",
      transactions: 72,
      currentAmount: 1080,
      goalAmount: 2000,
      icon: <Car size={20} />,
    },
  ])

  const [newGoal, setNewGoal] = useState({ name: "", goalAmount: "" })

  const handleAddGoal = () => {
    setGoals([
      ...goals,
      {
        name: newGoal.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        transactions: 0,
        currentAmount: 0,
        goalAmount: parseInt(newGoal.goalAmount),
        
      },
    ])
    setNewGoal({ name: "", goalAmount: "" })
  }

  return (
    <div className="p-4 space-y-4 min-h-screen bg-background text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
        <Dialog>
  <DialogTrigger asChild>
    <Button size="icon" variant="ghost">
      <Plus />
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-md bg-background p-0">
    <GoalForm />
  </DialogContent>
</Dialog>
      </div>

      {/* Add Goal Placeholder */}
      <Card className="border-dashed border-2 border-muted-foreground rounded-xl flex items-center justify-center py-12">
        <Plus className="opacity-40" size={32} />
      </Card>

      <p className="text-sm text-muted-foreground">Example Goals</p>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const percentage = Math.round((goal.currentAmount / goal.goalAmount) * 100)
          return (
            <Card key={index} className="bg-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{goal.name}</h2>
                  <p className="text-xs text-muted-foreground mb-1">{goal.date}</p>
                  <p className="text-xs text-muted-foreground mb-2">{goal.transactions} transactions</p>
                  <p className="text-lg font-bold">₹{goal.currentAmount.toLocaleString()} / ₹{goal.goalAmount.toLocaleString()}</p>
                  <Progress value={percentage} className="mt-1" />
                  <p className="text-xs mt-1">{percentage}%</p>
                </div>
                <div className="text-muted-foreground">{goal.icon}</div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
