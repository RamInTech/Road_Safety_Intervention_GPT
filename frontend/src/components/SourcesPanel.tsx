import { motion } from "framer-motion";
import { SourceCard } from "./SourceCard";
import { BookOpen } from "lucide-react";

interface Source {
  title: string;
  excerpt: string;
  source: string;
}

interface SourcesPanelProps {
  sources: Source[];
}

export const SourcesPanel = ({ sources }: SourcesPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full bg-background border-l border-border overflow-hidden flex flex-col"
    >
      <div className="p-6 border-b border-border bg-card/50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Sources</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {sources.length} reference{sources.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {sources.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground text-center">
              Sources will appear here when the AI responds
            </p>
          </div>
        ) : (
          sources.map((source, index) => (
            <SourceCard
              key={index}
              title={source.title}
              excerpt={source.excerpt}
              source={source.source}
              index={index}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};
