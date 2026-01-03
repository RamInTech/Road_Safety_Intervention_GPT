import { PanelLeft, PanelLeftClose } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { motion } from "framer-motion";

export const SidebarToggleButton = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
      style={{ marginLeft: open ? "256px" : "0px" }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="rounded-l-none rounded-r-lg shadow-lg border-l-0 bg-card hover:bg-muted"
      >
        {open ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </Button>
    </motion.div>
  );
};
