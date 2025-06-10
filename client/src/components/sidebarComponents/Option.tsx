import { useDesignStore } from "@/store/useDesignStore";
import { motion } from "motion/react"
import { Link } from "react-router-dom";

interface OptionProps {
  Icon: React.ComponentType;
  title: string;
  link: string;
  open: boolean;
}

const Option = (props: OptionProps) => {
  const { Icon, title, link, open } = props;
  const { selectedPage, setSelectedPage } = useDesignStore();


  return (
    <Link to={`/${link}`} >
      <motion.button
        layout
        onClick={() => setSelectedPage(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selectedPage === title ? "bg-foreground text-accent" : "text-primary hover:bg-secondary"}`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

export default Option