"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useActiveElementRect } from "@/hooks/use-active-element-rect";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "h-[36px] gap-2 group/tabs-list relative inline-flex w-fit items-center justify-center rounded-[10px] p-[2px] text-muted-foreground group-data-horizontal/tabs:h-[36px] group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default:
          "bg-black/3 shadow-[inset_0_6px_12px_0_rgba(0,0,0,0.02),inset_0_0.75px_0.75px_0_rgba(0,0,0,0.02)]",
        line: "gap-1 bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  const { containerRef, rect } = useActiveElementRect("[data-active]");

  return (
    <TabsPrimitive.List
      ref={containerRef as React.RefObject<HTMLDivElement>}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant }),
        className,
        "h-9 bg-[var(--fc-black-alpha-3)]"
      )}
      {...props}
    >
      {rect && (
        <motion.span
          className="absolute rounded-sm bg-white shadow-sm dark:border dark:border-input dark:bg-input/30"
          animate={{
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  );
}

function TabsDivider() {
  return (
    <svg
      width="1"
      height="12"
      viewBox="0 0 1 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="1" height="12" fill="black" fillOpacity="0.12" />
    </svg>
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-sm border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-active:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsDivider,
  tabsListVariants,
};
