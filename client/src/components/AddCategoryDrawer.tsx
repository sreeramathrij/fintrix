// components/AddCategoryDrawer.tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Label } from "@/components/ui/label";

export function AddCategoryDrawer() {
  const { categories, getCategories, addCategories } = useCategoryStore();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "expense" as "income" | "expense",
    referenceCategoryId: "",
  });

  // Fetch categories once when drawer opens
  useEffect(() => {
    if (open && !categories) {
      getCategories();
    }
  }, [open]);

  // Filter default (immutable) categories
  const defaultCategories =
    categories?.filter((cat) => cat.createdBy === null && cat.type === form.type) || [];

  const handleSubmit = async () => {
    if (!form.name.trim()) return;

    try {
      await addCategories(form);
      setForm({ name: "", type: "expense", referenceCategoryId: "" });
      setOpen(false);
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        >
          +
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4 bg-zinc-900 text-white">
        <DrawerHeader>
          <DrawerTitle>Add New Category</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 px-4">
          <div>
            <Label className="mb-1 block">Name</Label>
            <Input
              placeholder="Category Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-zinc-800 border-none text-white"
            />
          </div>

          <div>
            <Label className="mb-1 block">Type</Label>
            <select
              value={form.type}
              onChange={(e) => {
                setForm({
                  ...form,
                  type: e.target.value as "income" | "expense",
                  referenceCategoryId: "", // reset selected default
                });
              }}
              className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <Label className="mb-1 block"> Category</Label>
            <select
              value={form.referenceCategoryId}
              onChange={(e) => setForm({ ...form, referenceCategoryId: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white"
            >
              {defaultCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DrawerFooter className="mt-4">
          <Button onClick={handleSubmit}>Add</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
