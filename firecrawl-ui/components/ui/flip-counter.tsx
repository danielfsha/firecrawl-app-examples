"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

function Digit({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn("relative h-[1em] overflow-hidden w-[0.62em]", className)}
    >
      <motion.div
        animate={{ y: `${value * -10}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute inset-x-0 top-0 flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const distance = Math.abs(num - value);
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : 0;
          const blur = distance === 0 ? 0 : distance === 1 ? 2 : 4;
          return (
            <motion.span
              key={num}
              animate={{ opacity, filter: `blur(${blur}px)` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex h-[1em] items-center justify-center"
            >
              {num}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

interface FlipCounterProps {
  value: number;
  className?: string;
}

function FlipCounter({ value, className }: FlipCounterProps) {
  const digits = Array.from(String(Math.abs(Math.floor(value))), Number);

  return (
    <motion.div
      className={cn(
        "relative flex font-mono font-semibold tabular-nums leading-none overflow-hidden",
        className
      )}
      animate={{ width: "auto" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_6px_6px_-4px_rgba(249,249,249,0.9),inset_0_-6px_6px_-4px_rgba(249,249,249,0.9)]" />
      {value < 0 && <span>-</span>}
      <AnimatePresence initial={false} mode="popLayout">
        {digits.map((digit, idx) => (
          <motion.span
            key={digits.length - idx}
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)", scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="inline-flex"
          >
            <Digit value={digit} />
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export { FlipCounter, Digit };
