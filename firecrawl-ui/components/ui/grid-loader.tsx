"use client";

import { cn } from "@/lib/utils";

type LoaderProps = { className?: string };

// ─── Variant 1: Cross / plus shape ──────────────────────────────────────────
function GridLoaderCross({ className }: LoaderProps) {
  const grid = [
    [0, 0, 1, 1, 0, 0],
    [0, 2, 2, 2, 2, 0],
    [1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
  ];

  return (
    <div className={cn("relative inline-flex p-3", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
        <div className="absolute inset-x-0 h-[50%] animate-scan-down bg-linear-to-b from-transparent via-primary/40 to-transparent blur-sm" />
      </div>
      <div className="grid grid-cols-6 gap-[5px]">
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-[2px]",
              cell === 2
                ? "bg-primary"
                : cell === 1
                  ? "bg-[#FFE5DB] dark:bg-[#ffcdb8]"
                  : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Variant 2: Dense full grid ─────────────────────────────────────────────
function GridLoaderDense({ className }: LoaderProps) {
  const grid = [
    [1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  return (
    <div className={cn("relative inline-flex p-3", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
        <div className="absolute inset-x-0 h-[50%] animate-scan-down bg-linear-to-b from-transparent via-primary/40 to-transparent blur-sm" />
      </div>
      <div className="grid grid-cols-6 gap-[5px]">
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-[2px]",
              cell === 2 ? "bg-primary" : "bg-[#FFE5DB] dark:bg-[#ffcdb8]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Variant 3: Sparse / minimal ───────────────────────────────────────────
function GridLoaderSparse({ className }: LoaderProps) {
  const grid = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
  ];

  return (
    <div className={cn("relative inline-flex p-3", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
        <div className="absolute inset-x-0 h-[50%] animate-scan-down-slow bg-linear-to-b from-transparent via-primary/35 to-transparent blur-sm" />
      </div>
      <div className="grid grid-cols-5 gap-[5px]">
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-[2px]",
              cell === 2
                ? "bg-primary"
                : cell === 1
                  ? "bg-[#FFE5DB] dark:bg-[#ffcdb8]"
                  : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Variant 4: Radial X / star ─────────────────────────────────────────────
function GridLoaderRadial({ className }: LoaderProps) {
  const grid = [
    [1, 0, 0, 0, 1],
    [0, 2, 0, 2, 0],
    [0, 0, 2, 0, 0],
    [0, 2, 0, 2, 0],
    [1, 0, 0, 0, 1],
  ];

  return (
    <div className={cn("relative inline-flex p-3", className)}>
      <div className="absolute inset-[-20%] pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full h-full animate-radial-pulse rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_60%)] opacity-0" />
      </div>
      <div className="grid grid-cols-5 gap-[5px]">
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-[2px]",
              cell === 2
                ? "bg-primary"
                : cell === 1
                  ? "bg-[#FFE5DB] dark:bg-[#ffcdb8]"
                  : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export { GridLoaderCross, GridLoaderDense, GridLoaderSparse, GridLoaderRadial };
