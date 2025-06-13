import clsx from "clsx";

interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  picture: string;
  createdBy: string | null;
}

interface CategoryRadioGroupProps {
  categories: Category[];
  selectedCategory?: string;
  onSelect: (categoryId?: string) => void;
}

const CategoryRadioGroup = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryRadioGroupProps) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-4">
        {categories.filter(tx => tx.type === "expense").map((cat) => (
          <div
            key={cat._id}
            className="group relative flex flex-col justify-start items-center"
          >
            <button
              type="button"
              onClick={() =>
                onSelect(selectedCategory === cat._id ? undefined : cat._id)
              }
              className={clsx(
                "p-3 border text-sm rounded-lg flex flex-col items-center justify-center transition-all",
                selectedCategory === cat._id
                  ? "bg-indigo-100 border-indigo-500"
                  : "bg-background border-muted hover:border-primary"
              )}
            >
              <span className="text-2xl mb-1">
                <img className="size-8" src={cat.picture} alt={cat.name} />
              </span>
            </button>

            {/* Tooltip */}
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ${cat.type === "income" ? "bg-green-400" : "bg-red-500"} text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap shadow-md`}>
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRadioGroup;