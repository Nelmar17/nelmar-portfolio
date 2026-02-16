"use client";

import { motion } from "framer-motion";

interface GlitchSwapProps {
  words: string[];
  className?: string;
  duration?: number;
}

export default function GlitchSwap({
  words,
  className = "",
  duration = 2,
}: GlitchSwapProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial="visible"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: duration,
            repeat: Infinity,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute left-0 top-0"
          variants={{
            visible: {
              opacity: [0, 1, 0],
              x: [0, -2, 2, -1, 0],
              y: [0, 1, -1, 2, 0],
              filter: [
                "blur(0px)",
                "blur(1px)",
                "blur(0.5px)",
                "blur(0px)",
              ],
              transition: {
                duration: duration,
                ease: "easeInOut",
              },
            },
          }}
        >
          {/* Main word */}
          <span className="relative z-10">{word}</span>

          {/* Neon glitch colors */}
          <span className="absolute left-0 top-0 text-pink-500/70 -z-10 glitch-layer">
            {word}
          </span>
          <span className="absolute left-0 top-0 text-cyan-400/70 -z-10 glitch-layer">
            {word}
          </span>
        </motion.span>
      ))}
    </motion.span>
  );
}
