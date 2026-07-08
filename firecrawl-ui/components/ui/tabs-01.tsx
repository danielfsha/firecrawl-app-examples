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
        "font-sans group/tabs flex gap-2 data-horizontal:flex-col w-full",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "h-[56px] gap-0 group/tabs-list relative inline-flex w-full items-center justify-center p-[5px] text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default:
          "",
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
        className
      )}
      {...props}
    >
      {rect && (
        <motion.span
          className="absolute rounded-full shadow-[0_0px_0px_1px_rgba(0,0,0,0.01),0_20px_44px_0px_rgba(0,0,0,0.05)] bg-background border border-(--fc-border-faint)"
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
        "relative z-10 inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-transparent px-6 py-2 text-sm font-medium whitespace-nowrap text-foreground/50 transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-active:text-foreground data-active:font-semibold",
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
