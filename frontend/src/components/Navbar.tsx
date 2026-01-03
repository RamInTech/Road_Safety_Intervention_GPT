import { motion } from "framer-motion";
import { Shield, Home, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

interface NavbarProps {
  onHomeClick?: () => void;
  showNavigation?: boolean;
}

export const Navbar = ({ onHomeClick, showNavigation = false }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-hero p-2 rounded-xl shadow-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Road Safety Intervention GPT
              </h1>
              <p className="text-xs text-muted-foreground">National Road Safety Hackathon 2025</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {showNavigation && (
              <div className="flex items-center gap-2 mr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onHomeClick}
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 bg-primary/10"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
