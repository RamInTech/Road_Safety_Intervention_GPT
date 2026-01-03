import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "./AnimatedBackground";
import { Shield } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Source {
  title: string;
  excerpt: string;
  source: string;
}

interface ChatInterfaceProps {
  onSourcesUpdate: (sources: Source[]) => void;
}

export const ChatInterface = ({ onSourcesUpdate }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update sources from backend response
      onSourcesUpdate(data.sources || []);

      toast({
        title: "Response received",
        description: "The AI has responded to your query.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check if the backend is running on port 8000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      {/* Animated background - only visible when no messages */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <AnimatedBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/85" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 relative z-10">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center max-w-md">
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                Road Safety Assistant
              </h2>
              <p className="text-muted-foreground mb-6">
                Ask me about road safety interventions, best practices, and data-driven insights.
              </p>
              
              {/* Suggested Queries */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {[
                  "What are effective speed reduction measures?",
                  "How to improve pedestrian safety?",
                  "Best practices for traffic calming",
                  "Road design for accident prevention"
                ].map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(query)}
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded-full transition-all duration-200 hover:bg-muted/50"
                  >
                    {query}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
            index={index}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};
