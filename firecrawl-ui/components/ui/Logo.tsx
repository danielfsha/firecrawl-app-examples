"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, LayoutGroup } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import FirecrawlLogo from "./firecrawl-logo";
import { Separator } from "./separator";

const logoVariants = cva("relative cursor-pointer py-1", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Context to pass hover state down
const MenuContext = React.createContext<{
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
  close: () => void;
}>({ hoveredIdx: null, setHoveredIdx: () => {}, close: () => {} });

// LogoMenuItem

function LogoMenuItem({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { hoveredIdx, setHoveredIdx, close } = React.useContext(MenuContext);
  const idxRef = React.useRef(-1);
  const elRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const parent = el.closest("[data-logo-menu]");
    if (!parent) return;
    const items = parent.querySelectorAll("[data-menu-item]");
    items.forEach((item, i) => {
      if (item === el) idxRef.current = i;
    });
  }, []);

  const isHovered = hoveredIdx === idxRef.current;

  return (
    <button
      ref={elRef}
      type="button"
      data-menu-item
      className={cn(
        "font-sans relative flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--fc-accent-black)] whitespace-nowrap rounded-md cursor-pointer",
        className
      )}
      onMouseEnter={() => setHoveredIdx(idxRef.current)}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      {...props}
    >
      {isHovered && (
        <motion.span
          layoutId="logo-menu-hover"
          className="absolute inset-0 rounded-md bg-[var(--fc-black-alpha-4)] pointer-events-none"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors",
          isHovered && "text-primary"
        )}
      >
        {children}
      </span>
    </button>
  );
}

// LogoMenuSeparator

function LogoMenuSeparator() {
  return <Separator className="my-0.5" />;
}

// Logo

interface LogoProps
  extends ButtonPrimitive.Props, VariantProps<typeof logoVariants> {
  children?: React.ReactNode;
}

function Logo({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: LogoProps) {
  const [active, setActive] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActive(false);
      }
    };
    // Delay listener to avoid catching the same touch that opened the menu
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setActive((v) => !v);
  };

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setActive(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <ButtonPrimitive
      ref={containerRef}
      data-slot="button"
      className={cn(logoVariants({ variant, size, className }))}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      <FirecrawlLogo />
      {active && children && (
        <MenuContext.Provider
          value={{ hoveredIdx, setHoveredIdx, close: () => setActive(false) }}
        >
          <div
            data-logo-menu
            className="absolute top-[calc(100%+8px)] left-0 z-50 flex flex-col bg-white rounded-lg p-1 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.06)] border border-[var(--fc-border-faint)]"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <LayoutGroup>{children}</LayoutGroup>
          </div>
        </MenuContext.Provider>
      )}
    </ButtonPrimitive>
  );
}

// Need these hooks at component level
const { useState, useRef, useEffect } = React;

export { Logo, LogoMenuItem, LogoMenuSeparator, logoVariants };
