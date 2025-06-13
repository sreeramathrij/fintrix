import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ImageIcon, Palette } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategoryStore } from "@/store/useCategoryStore"
import { useGoalStore } from "@/store/useGoalstore"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface GoalFormProps {
  onCancel: () => void
  onSave?: () => void
}

export default function GoalForm({ onCancel,onSave }: GoalFormProps) {
  const [goalType, setGoalType] = useState<"expense" | "income">("income")
  const [title, setTitle] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [selectedColor, setSelectedColor] = useState("bg-green-500")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  const { createGoal } = useGoalStore()
  const { categories, getCategories } = useCategoryStore()

  useEffect(() => {
    getCategories()
  }, [goalType])

  const filteredCategories = categories?.filter((cat) => cat.type === goalType)

  const colors = [
    "bg-slate-400",
    "bg-green-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
  ]

  const handleSubmit = () => {
    if (!selectedCategoryId) return alert("Please select a category")
    if (!title || !targetAmount) return alert("Please fill in all fields")

    createGoal({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline: endDate?.toISOString() || new Date().toISOString(),
      category: selectedCategoryId,
    })
    onSave?.();
    onCancel()
  }

  return (
    <div className="p-4 min-h-screen bg-background text-primary">
      <div className="text-2xl font-bold mb-4">Add Goal</div>

      <Tabs defaultValue={goalType} onValueChange={(v) => setGoalType(v as "expense" | "income")}>
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="expense">Expense goal</TabsTrigger>
          <TabsTrigger value="income">Savings goal</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <Input
          className="text-lg placeholder:text-muted-foreground"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex gap-2 items-center mb-6">
        <Palette className="text-muted-foreground w-5 h-5" />
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              "w-6 h-6 rounded-full ring-2",
              color,
              selectedColor === color ? "ring-white" : "ring-transparent"
            )}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <div className="mb-4">
        <label className="text-sm text-muted-foreground mb-1 block">Category</label>
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories?.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                <div className="flex items-center gap-2">
                  <img src={cat.picture} alt={cat.name} className="w-4 h-4" />
                  <span>{cat.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label className="text-sm text-muted-foreground">Target Amount</label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="₹0"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
      </div>

      <div className="flex justify-between gap-4 mb-6">

        <div className="flex-1">
          <label className="text-sm text-muted-foreground">End</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd MMM yyyy") : "Until Forever"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button className="w-full text-md" onClick={handleSubmit}>
          Save Goal
        </Button>
        <Button variant="ghost" className="w-full text-md" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
