import { motion } from "framer-motion";
import { Shield, Car, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatedBackground } from "./AnimatedBackground";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark/10 via-background to-accent/10 flex items-center justify-center p-6 pt-24 overflow-hidden relative">
      {/* Animated Road Background */}
      <AnimatedBackground />

      {/* Subtle gradient overlay for text clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/85" />

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-6 right-6 z-20"
      >
        <ThemeToggle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Animated icons with spring physics */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [-10, 10, -10]
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.3 },
              rotate: { type: "spring", stiffness: 260, damping: 20, delay: 0.3 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, y: -50 }}
            animate={{ 
              scale: 1, 
              y: [-10, 10, -10]
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.5 },
              y: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.2
              }
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-lg"
          >
            <Car className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [-10, 10, -10]
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.7 },
              rotate: { type: "spring", stiffness: 260, damping: 20, delay: 0.7 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow"
          >
            <AlertTriangle className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent"
        >
          Road Safety Intervention GPT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          National Road Safety Hackathon 2025
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Evidence-Based Solutions
            </h3>
            <p className="text-sm text-muted-foreground">
              RAG-powered insights from WHO, iRAP, MoRTH & more
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Safety First
            </h3>
            <p className="text-sm text-muted-foreground">
              Data-driven interventions to reduce road fatalities
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Real-Time Guidance
            </h3>
            <p className="text-sm text-muted-foreground">
              Instant answers with verified source citations
            </p>
          </motion.div>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-hero hover:opacity-90 text-white px-8 py-6 text-lg rounded-2xl shadow-glow group"
          >
            Start Your Safety Journey
            <motion.div
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Animated road decoration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 relative"
        >
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
