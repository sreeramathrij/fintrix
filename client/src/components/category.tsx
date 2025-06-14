import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore"; // adjust path

import {
  Trash2,
  GripVertical,
  Plus,
  Search
} from "lucide-react";
import clsx from "clsx";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AddCategoryDrawer } from "./AddCategoryDrawer";

export default function EditCategories() {
  const {
    categories,
    getCategories,
    deleteCategory
  } = useCategoryStore();

  useEffect(() => {
    getCategories();
  }, []);

  const [search, setSearch] = useState("");

  

  const filtered = categories?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 pb-24">
      <div className="text-2xl font-bold mb-4">Edit Categories</div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-muted border-none text-primary"
        />
      </div>

      <div className="space-y-3">
        {filtered?.map((category) => (
          <Card
            key={category._id}
            className="bg-secondary text-primary rounded-xl flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl",
                  "bg-secondary" // you can adjust this to use color if saved
                )}
              >
                <img
                src ={category.picture}
                />
              </div>
              <div>
                <div className="font-semibold text-base">{category.name}</div>
                <div className="text-xs text-muted-foreground">
                  {category.type}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {category.createdBy && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-red-500"
                  onClick={() => deleteCategory(category._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
            </div>
          </Card>
        ))}
      </div>

      <Button size="icon" className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
        <Plus className="w-6 h-6" />
      </Button>
      <AddCategoryDrawer/>
    </div>
  );
}

