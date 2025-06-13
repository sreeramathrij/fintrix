import { Plus } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";

const AddBudgetCard = () => {
  return (
    <DrawerTrigger asChild>
      <button className="h-[14rem] w-full rounded-md border-2 border-solid border-secondary flex flex-col items-center justify-center hover:bg-accent transition-colors">
        <Plus className="w-6 h-6 mb-1" />
        <span className="text-sm text-muted-foreground">Add Budget</span>
      </button>
    </DrawerTrigger>
  );
};

export default AddBudgetCard;