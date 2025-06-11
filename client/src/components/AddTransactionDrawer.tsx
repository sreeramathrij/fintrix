import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionsStore } from "@/store/useTranscationStore";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTransactionDrawer() {
const { selectedTransaction, setSelectedTransaction,editTransaction,addTransaction } = useTransactionsStore();
const isEditing = !!selectedTransaction;
  const { categories,getCategories } = useCategoryStore();
 const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    description: selectedTransaction?.description || "",
    amount: selectedTransaction?.amount || "",
    type: selectedTransaction?.type ||"expense",
    category: selectedTransaction?.category || "",
    date:selectedTransaction?.date || new Date().toISOString().split("T")[0], // Default to today
  });
  useEffect(()=>{
    getCategories()
  },[])
  useEffect(() => {
  if (selectedTransaction) {
    setOpen(isEditing)
    setForm({
      description: selectedTransaction.description,
      amount: selectedTransaction.amount,
      type:selectedTransaction.type,
      category:selectedTransaction.category,
      date:selectedTransaction.date,
    });
  }
}, [selectedTransaction]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: "income" | "expense") => {
    setForm((prev) => ({ ...prev, type, category: "" }));
  };
  const handleSubmit = () => {
  if (isEditing) {
    editTransaction(selectedTransaction._id,{
      description: form.description,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    });
  } else {
     addTransaction({
      description: form.description,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    });

   
  }

  setSelectedTransaction(null); // Reset after done
  setOpen(false);
};
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Transaction</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 space-y-4">
        <DrawerHeader>
          <DrawerTitle>Add Transaction</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4">
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Grocery shopping"
            />
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 1000"
              type="number"
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <div className="flex gap-2">
              <Button
                variant={form.type === "expense" ? "default" : "outline"}
                onClick={() => handleTypeChange("expense")}
                className={cn("flex-1", form.type === "expense" && "bg-destructive text-white")}
              >
                Expense
              </Button>
              <Button
                variant={form.type === "income" ? "default" : "outline"}
                onClick={() => handleTypeChange("income")}
                className={cn("flex-1", form.type === "income" && "bg-green-600 text-white")}
              >
                Income
              </Button>
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-background"
            >
              <option value="">Select category</option>
              {categories?.filter((cat) => cat.type === form.type)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Date</Label>
           <DatePicker
                selected={new Date(form.date)}
                onChange={(date: Date) =>
                    setForm((prev) => ({
                    ...prev,
                    date: date.toISOString().split("T")[0],
                    }))
                }
  className="w-full p-2 border rounded-md bg-background text-primary"
  dateFormat="yyyy-MM-dd"
/>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
