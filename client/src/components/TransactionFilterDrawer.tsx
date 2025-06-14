import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { DateRangePicker } from "./ui/date-range-picker";

export function TransactionFilterDrawer({ onApply }: {
  onApply: (filters: {
    dateRange: DateRange | undefined,
    categoryId: string | null,
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <FilterIcon size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 space-y-4">
        <DrawerHeader>
          <DrawerTitle>Filter Transactions</DrawerTitle>
          <DrawerDescription>Select a time range or category</DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Date Range</p>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          {/* Optional: Add a category select here */}
          {/* You can map categories here */}
        </div>

        <DrawerFooter>
          <Button onClick={() => {
            onApply({ dateRange, categoryId });
            setOpen(false);
          }}>Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}