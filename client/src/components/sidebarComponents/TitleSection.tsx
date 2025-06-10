import { motion } from "motion/react";
import Logo from "./Logo";

interface TitleSectionProps {
  open: boolean;
}

const TitleSection = ({ open }: TitleSectionProps) => {
  return (
    <div className="mb-3 border-b border-muted-foreground pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-secondary">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-lg font-bold">Fintrix</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;