import { useDesignStore } from "@/store/useDesignStore";
import { motion } from "motion/react";
import { FiChevronsRight } from "react-icons/fi";

const ToggleClose = () => {

  const { open, setOpen } = useDesignStore();

  return (
    <motion.button
      layout
      onClick={() => setOpen(!open)}
      className=" left-0 right-0 border-t border-muted-foreground transition-colors hover:bg-secondary"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default ToggleClose;