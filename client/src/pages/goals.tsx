import { useState } from "react"
import { Plus, Car } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
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

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddGoal = (goal: {
    name: string
    goalAmount: number
    startDate?: Date
    endDate?: Date
    color?: string
  }) => {
    const newGoal = {
      name: goal.name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      transactions: 0,
      currentAmount: 0,
      goalAmount: goal.goalAmount,
    }

    setGoals((prev) => [...prev, newGoal])
    setDialogOpen(false)
  }

  return (
    <div className="p-4 space-y-4 min-h-screen bg-background text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
      </div>

      {/* Dialog wrapping only the large + */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Card
            className="border-dashed border-2 border-muted-foreground rounded-xl flex items-center justify-center py-12 cursor-pointer hover:opacity-75 transition"
          >
            <Plus className="opacity-40" size={32} />
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-background p-0">
          <GoalForm onSave={handleAddGoal} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

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
