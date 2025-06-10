import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Trash2,
  GripVertical,
  Plus,
  Search
} from "lucide-react"
import { useState } from "react"
import clsx from "clsx"

type Category = {
  name: string
  type: "Expense" | "Income"
  transactions: number
  color: string
  icon: string // emoji for simplicity; can be replaced with SVGs or Lucide icons
}

const defaultCategories: Category[] = [
  { name: "Dining", type: "Expense", transactions: 0, color: "bg-zinc-700", icon: "🍽️" },
  { name: "Groceries", type: "Expense", transactions: 0, color: "bg-green-600", icon: "🛒" },
  { name: "Shopping", type: "Expense", transactions: 0, color: "bg-rose-600", icon: "🛍️" },
  { name: "Entertainment", type: "Expense", transactions: 0, color: "bg-blue-600", icon: "🍿" },
  { name: "Transit", type: "Expense", transactions: 0, color: "bg-yellow-600", icon: "🚌" },
  { name: "Bills & Fees", type: "Expense", transactions: 0, color: "bg-green-700", icon: "💸" },
  { name: "Gifts", type: "Expense", transactions: 0, color: "bg-pink-500", icon: "🎁" },
  { name: "Beauty", type: "Expense", transactions: 0, color: "bg-purple-600", icon: "💅" },
  { name: "Work", type: "Expense", transactions: 0, color: "bg-orange-600", icon: "💼" },
  { name: "Travel", type: "Expense", transactions: 0, color: "bg-indigo-600", icon: "✈️" },
  { name: "Income", type: "Income", transactions: 0, color: "bg-emerald-600", icon: "💰" },
]

export default function EditCategories() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [search, setSearch] = useState("")

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 pb-24">
      <div className="text-2xl font-bold mb-4">Edit Categories</div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-zinc-800 border-none text-white"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((category, idx) => (
          <Card key={idx} className="bg-zinc-900 text-white rounded-xl flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-xl", category.color)}>
                {category.icon}
              </div>
              <div>
                <div className="font-semibold text-base">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.type} · {category.transactions} transactions</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
            </div>
          </Card>
        ))}
      </div>

      <Button size="icon" className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
