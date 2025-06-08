import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Search, MoreVertical } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="p-4 pb-24 min-h-screen bg-background text-white">
      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">

 

  {/* Title */}
  <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
    Edit Accounts
  </h2>

  {/* Right Buttons */}
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="icon">
      <Plus className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-5 w-5" />
    </Button>
  </div>
</div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-2.5 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search accounts..."
          className="pl-10 rounded-xl bg-zinc-800 border-none text-white"
        />
      </div>

      {/* No Budgets */}
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
       
        <p className="text-sm">No Accounts.</p>
      </div>

      {/* Floating Add Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 rounded-xl w-14 h-14 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
