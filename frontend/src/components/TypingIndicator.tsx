import { motion } from "framer-motion";

export const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0, opacity: 0.3 },
    animate: { y: -8, opacity: 1 },
  };

  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-gradient-bot rounded-2xl shadow-sm w-fit">
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.15,
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
    </div>
  );
};
