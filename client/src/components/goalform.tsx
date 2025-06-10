import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ImageIcon, Palette } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GoalForm() {
  const [goalType, setGoalType] = useState<"expense" | "savings">("savings")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState("bg-green-500")

  const colors = [
    "bg-slate-400",
    "bg-green-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
  ]

  return (
    <div className="p-4 min-h-screen bg-background text-primary">
      <div className="text-2xl font-bold mb-4">Add Goal</div>

      {/* Goal type toggle */}
      <Tabs defaultValue={goalType} onValueChange={(v) => setGoalType(v as "expense" | "savings")}>
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="expense">Expense goal</TabsTrigger>
          <TabsTrigger value="savings">Savings goal</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Icon + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <Input
          className="text-lg placeholder:text-muted-foreground"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Color selection */}
      <div className="flex gap-2 items-center mb-6">
        <Palette className="text-muted-foreground w-5 h-5" />
        {colors.map((color) => (
          <button
            key={color}
            className={cn("w-6 h-6 rounded-full ring-2", color, selectedColor === color ? "ring-white" : "ring-transparent")}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      {/* Goal Amount */}
      <div className="mb-4">
        <label className="text-sm text-muted-foreground">Goal</label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="₹0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Date Range */}
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1">
          <label className="text-sm text-muted-foreground">Start</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd MMM yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>
        </div>

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

      <Button className="w-full text-md">Set Name</Button>
    </div>
  )
}