import { motion } from "framer-motion";
import { Car } from "lucide-react";

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Vertical road lines moving down - balanced on both sides */}
      {[...Array(6)].map((_, i) => {
        const isLeft = i < 3;
        const position = isLeft 
          ? `${20 + (i * 10)}%` 
          : `${60 + ((i - 3) * 10)}%`;
        
        return (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-[2px] h-full"
            style={{ 
              left: position,
              background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.3) 50%, transparent)'
            }}
            animate={{
              y: ["-100%", "100%"],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 4 + (i % 3) * 0.3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        );
      })}
      
      {/* Dashed center lines - realistic road markings */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dash-${i}`}
          className="absolute rounded-sm"
          style={{ 
            left: 'calc(50% - 4px)',
            width: '8px',
            height: '60px',
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
          }}
          animate={{
            y: ["-80px", "100vh"],
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Diagonal moving lines - minimal */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`d-line-${i}`}
          className="absolute h-[2px] w-[150%] -rotate-45 origin-center"
          style={{ 
            top: `${i * 25}%`,
            left: '-25%',
            background: 'linear-gradient(to right, transparent, hsl(var(--accent)) 50%, transparent)'
          }}
          animate={{
            x: ["0%", "50%"],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Traffic flow particles - minimal */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 400],
            y: [0, (Math.random() - 0.5) * 400],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Animated cars moving across the screen - minimal */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`car-${i}`}
          className="absolute"
          style={{
            top: `${15 + i * 12}%`,
            left: i % 2 === 0 ? '-10%' : '110%',
          }}
          animate={{
            x: i % 2 === 0 ? ['0%', '120vw'] : ['0%', '-120vw'],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
        >
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg"
            style={{
              background: i % 3 === 0 ? 'hsl(var(--primary) / 0.8)' : i % 3 === 1 ? 'hsl(var(--accent) / 0.8)' : 'hsl(var(--primary) / 0.6)',
              transform: i % 2 === 0 ? 'scaleX(1)' : 'scaleX(-1)',
            }}
          >
            <Car className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      ))}

      {/* Large ambient orbs - more visible */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.25), transparent)' }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.25), transparent)' }}
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 70%)'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
