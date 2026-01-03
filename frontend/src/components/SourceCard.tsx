import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SourceCardProps {
  title: string;
  excerpt: string;
  source: string;
  index: number;
}

export const SourceCard = ({ title, excerpt, source, index }: SourceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      layout
      className="bg-card border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 flex-1">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </div>

      <Badge variant="secondary" className="mb-2 text-xs">
        {source}
      </Badge>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              {excerpt}
            </p>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark mt-2 transition-colors">
              <ExternalLink className="w-3 h-3" />
              View Source
            </button>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground line-clamp-2"
          >
            {excerpt}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
