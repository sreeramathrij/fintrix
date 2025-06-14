import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGoalStore } from "@/store/useGoalstore"
import { Minus, Plus } from "lucide-react"

interface UpdateGoalAmountProps {
  goalId: string
}

export default function UpdateGoalAmount({ goalId }: UpdateGoalAmountProps) {
  const { goals, updateGoal } = useGoalStore()
  const goal = goals?.find((g) => g._id === goalId)

  const [adjustment, setAdjustment] = useState("")
  const [loading, setLoading] = useState(false)

  if (!goal) return null

  const handleUpdate = async (type: "increase" | "decrease") => {
    const value = parseFloat(adjustment)
    if (isNaN(value) || value <= 0) return alert("Enter a valid positive number")

    const updatedAmount = type === "increase"
      ? goal.currentAmount + value
      : goal.currentAmount - value

    if (updatedAmount < 0) return alert("Amount cannot be negative")

    const updatePayload = {
      title: goal.title,
      targetAmount: goal.targetAmount,
      currentAmount: updatedAmount,
      deadline: goal.deadline,
      category: typeof goal.category === "string" ? goal.category : goal.category._id,
    }

    setLoading(true)
    await updateGoal(goalId, updatePayload)
    setAdjustment("")
    setLoading(false)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      

      <Input
        type="text"
        value={adjustment}
        onChange={(e) => setAdjustment(e.target.value)}
        placeholder="Amount"
        className="w-32"
        disabled={loading}
      />

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => handleUpdate("decrease")}
          disabled={loading}
        >
           <Minus size={14} />
        </Button>
        <Button
          onClick={() => handleUpdate("increase")}
          disabled={loading}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  )
}
