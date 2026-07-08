"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import useMeasure from "@/hooks/use-measure";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("group/item", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "text-black group/accordion-trigger relative flex flex-1 items-start justify-between border-b border-border py-4 px-4 text-left text-md transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { height } = useMeasure({ ref });
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const item = wrapperRef.current?.closest("[data-slot='accordion-item']");
    if (!item) return;

    const check = () => {
      const trigger = item.querySelector("[data-slot='accordion-trigger']");
      setIsOpen(trigger?.getAttribute("aria-expanded") === "true");
    };

    check();
    const observer = new MutationObserver(check);
    observer.observe(item, {
      attributes: true,
      subtree: true,
      attributeFilter: ["aria-expanded"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
          filter: isOpen ? "blur(0px)" : "blur(4px)",
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ overflow: "hidden" }}
      >
        <div
          ref={ref}
          className={cn(
            "py-4 pb-4 px-4 text-sm [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4 text-md opacity-75",
            className
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
