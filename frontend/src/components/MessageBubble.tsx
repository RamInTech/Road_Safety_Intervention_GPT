import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  index: number;
}

export const MessageBubble = ({ role, content, index }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-5 py-3 rounded-2xl shadow-md",
          isUser
            ? "bg-gradient-user text-white rounded-br-sm"
            : "bg-gradient-bot text-foreground rounded-bl-sm border border-border"
        )}
      >
        <div
          className={cn(
            "prose prose-sm max-w-none",
            isUser ? "prose-invert" : ""
          )}
        >
          <ReactMarkdown
            components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold mb-2 mt-0">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-bold mb-2 mt-0">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-semibold mb-1 mt-0">{children}</h3>
            ),
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="ml-4 mb-2 list-disc">{children}</ul>,
            ol: ({ children }) => <ol className="ml-4 mb-2 list-decimal">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="px-1.5 py-0.5 rounded bg-background/50 text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="p-3 rounded-lg bg-background/50 overflow-x-auto text-sm">
                {children}
              </pre>
            ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
