import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useCategoryStore } from "@/store/useCategoryStore";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import AddBudgetCard from "./AddBudgetCard";
import CategoryRadioGroup from "./CategoryRadioGroup";

const AddBudgetDrawerForm = () => {
  const { upsertBudget } = useBudgetStore();
  const { categories } = useCategoryStore();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    if (!amount) return;
    const today = new Date();
    const month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    upsertBudget({
      amount: parseFloat(amount),
      category: category || undefined,
      month,
    });

    // reset
    setAmount("");
    setCategory(undefined);
  };

  return (
    <Drawer>
      <AddBudgetCard />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a Budget</DrawerTitle>
          <DrawerDescription>Allocate a monthly budget to track your spending.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CategoryRadioGroup
            categories={categories ?? []}
            selectedCategory={category}
            onSelect={setCategory}
          />
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Save Budget</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ); 
};

export default AddBudgetDrawerForm;