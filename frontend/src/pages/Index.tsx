import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarToggleButton } from "@/components/SidebarToggleButton";

interface Source {
  title: string;
  excerpt: string;
  source: string;
}

const Index = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentView, setCurrentView] = useState<"chat" | "sources">("chat");

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleHomeClick = () => {
    setShowWelcome(true);
  };

  const handleNewChat = () => {
    setSources([]);
    // In a real app, you would also clear the messages or create a new conversation
  };

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full bg-background"
        >
          <Navbar onHomeClick={handleHomeClick} showNavigation={true} />
          <WelcomeScreen onStart={handleStart} />
        </motion.div>
      ) : (
        <SidebarProvider defaultOpen={true}>
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-background flex"
          >
            <AppSidebar
              currentView={currentView}
              onViewChange={setCurrentView}
              sourcesCount={sources.length}
              sources={sources}
              onNewChat={handleNewChat}
            />
            
            <SidebarToggleButton />
            
            <div className="flex-1 flex flex-col w-full">
              <Navbar onHomeClick={handleHomeClick} showNavigation={true} />
              
              <main className="flex-1 h-screen pt-[73px] relative overflow-hidden">

                <AnimatePresence mode="wait">
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ChatInterface onSourcesUpdate={setSources} />
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        </SidebarProvider>
      )}
    </AnimatePresence>
  );
};

export default Index;
