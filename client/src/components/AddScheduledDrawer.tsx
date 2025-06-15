import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useScheduledTransactionStore } from "@/store/useScheduledTransacitonStore";
import CategoryRadioGroup from "./CategoryRadioGroup";
import { useCategoryStore } from "@/store/useCategoryStore";


export function AddScheduledTransactionDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: 0,
    type: "expense" as "expense" | "income",
    category: "",
    startDate: new Date().toISOString().split("T")[0],
    frequency: "monthly" as "monthly" | "weekly" | "daily",
  });

  const { categories, getCategories } = useCategoryStore();
  const [category, setCategory] = useState<string>("");

  const { createScheduledTransaction } = useScheduledTransactionStore();

  const handleSubmit = () => {
    createScheduledTransaction({
      ...form,
      category,
    });
    setOpen(false);
  };

  useEffect(() => {
    getCategories();
  }, [category])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" className="rounded-2xl bg-primary text-secondary shadow-lg fixed bottom-6 right-6 sm:bottom-8 sm:right-8">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Add Scheduled Transaction</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => {setForm(prev => ({
              ...prev,
              title: e.target.value,
            }))}}
          />

          <Input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => {setForm(prev => ({
              ...prev,
              amount: e.target.valueAsNumber,
            }))}}
          />

          <select
            name="type"
            value={form.type}
            onChange={(e) => {setForm(prev => ({
              ...prev,
              type: e.target.value as "expense" | "income",
            }))}}
            className="w-full p-2 border bg-background rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <CategoryRadioGroup
            categories={categories ?? []}
            selectedCategory={category}
            onSelect={setCategory as (categoryId?: string | undefined) => void}
            type={form.type as "income" | "expense"}
          />

          <Input
            name="startDate"
            type="date" value={form.startDate}
            onChange={(e) => {setForm(prev => ({
              ...prev,
              startDate: e.target.value,
            }))}}
          />

          <select
            name="frequency"
            value={form.frequency}
            onChange={(e) => {setForm(prev => ({
              ...prev,
              frequency: e.target.value as "monthly" | "weekly" | "daily",
            }))}}
            className="w-full p-2 bg-background border rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <DrawerFooter className="mt-4">
          <Button onClick={handleSubmit}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}