"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("relative pl-8 my-6 [counter-reset:step]", className)}>
      {children}
    </div>
  );
}

interface StepProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function Step({ children, title, className }: StepProps) {
  return (
    <div
      className={cn(
        "relative pb-6 last:pb-0 [counter-increment:step] before:absolute before:left-[-25px] before:top-[2px] before:flex before:h-5 before:w-5 before:items-center before:justify-center before:rounded-full before:border before:border-(--fc-border-faint) before:bg-white before:text-xs before:font-medium before:text-(--fc-black-alpha-56) before:content-[counter(step)] after:absolute after:left-[-16px] after:top-[26px] after:h-[calc(100%-26px)] after:w-px after:bg-(--fc-border-faint) last:after:hidden",
        className
      )}
    >
      {title && (
        <h4 className="text-sm font-semibold text-(--fc-accent-black) mb-2">
          {title}
        </h4>
      )}
      <div className="text-sm text-(--fc-black-alpha-72)">{children}</div>
    </div>
  );
}

export { Steps, Step };
