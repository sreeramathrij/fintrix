
import {
  FiDollarSign,
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import { FaPiggyBank } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import { motion } from "motion/react";
import Option from "./sidebarComponents/Option";
import TitleSection from "./sidebarComponents/TitleSection"
import ToggleClose from "./sidebarComponents/ToggleClose";
import { useDesignStore } from "@/store/useDesignStore";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { open } = useDesignStore();
  const { logout } = useAuthStore();

  return (
    <motion.nav
      layout
      className="sticky z-10 top-0 h-screen shrink-0 border-r flex flex-col border-muted-foreground bg-background p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <Option
            Icon={FiHome}
            title="Dashboard"
            link=""
            open={open}
          />
          <Option
            Icon={FiDollarSign}
            title="Transactions"
            link="transactions"
            open={open}
          />
          <Option
            Icon={FaPiggyBank}
            title="Budget"
            link="budgets"
            open={open}
          />
          <Option
            Icon={IoOptions}
            title="More"
            link="more"
            open={open}
          />
        </div>
        <motion.button
          onClick={logout}
          className={"relative flex h-14 w-full items-center rounded-md transition-colors text-primary hover:bg-secondary"}
        >
          <motion.div
            layout
            className="grid h-full w-10 ml-2 place-content-center text-lg"
          >
            <FiLogOut />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>

      <ToggleClose />
    </motion.nav>
  );
};

export default Sidebar;