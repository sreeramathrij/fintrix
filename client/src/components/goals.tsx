import { useState, useEffect } from "react"
import { Plus,Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import GoalForm from "@/components/goalform"
import { useCategoryStore } from "@/store/useCategoryStore"
import { useGoalStore } from "@/store/useGoalstore"
import UpdateGoalAmount from "./UpdateGoalAmount"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"


export default function GoalsPage() {
  const {goals,getGoals,createGoal,deleteGoal}=useGoalStore()

  const [dialogOpen, setDialogOpen] = useState(false)

  const { categories, getCategories } = useCategoryStore()

  useEffect(() => {
    getCategories()
    getGoals()
  }, [])

  const handleDelete = async (goalId: string) => {
   
    await deleteGoal(goalId)
  }

 
  return (
    <div className="p-4 space-y-4 min-h-screen bg-background text-primary">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
      </div>

      {/* Dialog wrapping only the large + */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Card className="border-dashed border-2 border-muted-foreground rounded-xl flex items-center justify-center py-12 cursor-pointer hover:opacity-75 transition">
            <Plus className="opacity-40" size={32} />
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-background p-0">
          <GoalForm
                onSave={() => setDialogOpen(false)}
                onCancel={() => setDialogOpen(false)}/>
        </DialogContent>
      </Dialog>

      <p className="text-sm text-muted-foreground">Your Goals</p>

      <div className="space-y-4">
        {goals?.map((goal) => {
  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);

  const icon = typeof goal.category === "object" ? goal.category?.picture: undefined;
  const name = typeof goal.category === "object" ? goal.category?.name : "";
  const color = (goal as any).color || "bg-slate-400"; // fallback

  return (
              <Card key={goal._id} className="bg-gradient-to-br from-background to-muted p-4 rounded-2xl shadow-lg relative">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="absolute bottom-4 right-4 text-sm text-red-300 hover:text-red-600 hover:scale-105 transition-all duration-300">
                  <Trash2 size={36}/>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Goal?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove the Goal and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(goal._id)
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold">{goal.title}</h2>
                <p className="text-xs text-muted-foreground mb-1">
                  {new Date(goal.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
               
                <p className="text-lg font-bold">
                  ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                </p>
                <Progress value={percentage} className="mt-1" />
                <p className="text-xs mt-1">{percentage}%</p>

                <UpdateGoalAmount goalId={goal._id} />
              </div>

              {/* Category Icon & Name */}
              {icon && (
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${color}`}
                  >
                    <img src={icon} alt="icon" className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{name}</span>
                </div>
              )}
            </div>
          </Card>

                );
              })}

                    </div>
                  </div>
                )
              }
