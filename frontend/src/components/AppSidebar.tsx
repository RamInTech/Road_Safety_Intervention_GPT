import { MessageSquare, BookOpen, Plus, History } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { SourceCard } from "./SourceCard";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

interface Source {
  title: string;
  excerpt: string;
  source: string;
}

interface AppSidebarProps {
  currentView: "chat" | "sources";
  onViewChange: (view: "chat" | "sources") => void;
  sourcesCount: number;
  sources: Source[];
  onNewChat?: () => void;
}

export function AppSidebar({ currentView, onViewChange, sourcesCount, sources, onNewChat }: AppSidebarProps) {
  const { open, toggleSidebar } = useSidebar();

  // Sample chat history - in real app, this would come from props or state
  const chatHistory = [
    { id: 1, title: "Safety measures discussion", date: "2 hours ago" },
    { id: 2, title: "Traffic intervention query", date: "Yesterday" },
    { id: 3, title: "Road design consultation", date: "2 days ago" },
  ];

  const menuItems = [
    {
      id: "chat" as const,
      title: "Chat",
      icon: MessageSquare,
      description: "AI Assistant",
    },
    {
      id: "sources" as const,
      title: "Sources",
      icon: BookOpen,
      description: `${sourcesCount} references`,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {open && (
        <SidebarHeader className="border-b border-border p-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-foreground"
          >
            Navigation
          </motion.h2>
        </SidebarHeader>
      )}

      <SidebarContent>
        {/* New Chat Button */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2 pt-2">
            <Button
              onClick={onNewChat}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              {open && <span>New Chat</span>}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      className={`relative h-14 ${
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                          : "hover:bg-muted"
                      }`}
                      tooltip={item.title}
                    >
                      <motion.div
                        className="flex items-center gap-3 w-full"
                        initial={false}
                        animate={{
                          justifyContent: open ? "flex-start" : "center",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon
                          className={`${
                            isActive ? "text-primary" : "text-muted-foreground"
                          } transition-colors`}
                          size={20}
                        />
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-start"
                          >
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History or Sources based on current view */}
        {open && currentView === "chat" && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-xs text-muted-foreground flex items-center gap-2">
              <History className="h-3 w-3" />
              Chat History
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <ScrollArea className="h-[200px]">
                <SidebarMenu>
                  {chatHistory.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        className="h-auto py-2 px-3 flex-col items-start hover:bg-muted"
                        tooltip={chat.title}
                      >
                        <span className="text-sm font-medium text-foreground line-clamp-1">
                          {chat.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {chat.date}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Sources List */}
        {open && currentView === "sources" && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-xs text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-3 w-3" />
              Sources ({sourcesCount})
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <ScrollArea className="h-[400px]">
                {sources.length === 0 ? (
                  <div className="flex items-center justify-center py-8 px-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Sources will appear here when the AI responds
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 pb-2">
                    {sources.map((source, index) => (
                      <div key={index} className="bg-card border border-border rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                          {source.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                          {source.excerpt}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          {source.source}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
