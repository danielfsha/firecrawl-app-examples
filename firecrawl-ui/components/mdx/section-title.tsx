"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Context to provide total count and track current index
const SectionCounterContext = React.createContext<{ getNext: () => number; total: number }>({
  getNext: () => 1,
  total: 0,
});

export function SectionCounterProvider({ total, children }: { total: number; children: React.ReactNode }) {
  const counterRef = React.useRef(0);
  // Reset on each render cycle
  counterRef.current = 0;

  const getNext = React.useCallback(() => {
    counterRef.current += 1;
    return counterRef.current;
  }, []);

  return (
    <SectionCounterContext.Provider value={{ getNext, total }}>
      {children}
    </SectionCounterContext.Provider>
  );
}

interface SectionTitleProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionTitle({ children, className, id }: SectionTitleProps) {
  const { getNext, total } = React.useContext(SectionCounterContext);
  const idxRef = React.useRef<number | null>(null);

  if (idxRef.current === null) {
    idxRef.current = getNext();
  }

  const current = String(idxRef.current).padStart(2, "0");
  const totalStr = total > 0 ? String(total).padStart(2, "0") : "??";
  const displayTitle = typeof children === "string" ? children : "";

  return (
    <div
      id={id}
      className={cn(
        "relative flex items-center border-y border-(--fc-border-faint) py-8 my-6 scroll-mt-4",
        className
      )}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 bg-primary" />
      <div className="flex items-center gap-2 pl-6 font-mono text-[13px] tracking-widest text-(--fc-black-alpha-40)">
        <span className="text-(--fc-black-alpha-24)">[</span>
        <span className="text-primary font-semibold">{current}</span>
        <span className="text-(--fc-black-alpha-24)">/</span>
        <span>{totalStr}</span>
        <span className="text-(--fc-black-alpha-24)">]</span>
        <span className="text-(--fc-black-alpha-16)">·</span>
        <span className="uppercase">{displayTitle}</span>
      </div>
    </div>
  );
}
