"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "cursor-pointer peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[size=default]:h-[20px] data-[size=default]:w-[50px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-checked:bg-primary data-unchecked:bg-input data-unchecked:shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.02)] dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "data-checked:shadow-[inset_0_0.25px_0.25px_0_rgba(174,37,0,0.06),inset_0_0.75px_0.75px_0_rgba(174,37,0,0.06),inset_6px_12px_0.25px_0_rgba(174,37,0,0.12),]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:h-[16px] group-data-[size=default]/switch:w-[28px] group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(50px-28px-3px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-[2px] group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground data-unchecked:shadow-[0_1px_2px_0_rgba(0,0,0,0.06),0_1px_3px_0_rgba(0,0,0,0.1)] data-checked:shadow-[0_0.5px_0.5px_0_rgba(174,37,0,0.24),0_1px_2px_0_rgba(174,37,0,0.12),0_3px_6px_-1px_rgba(174,37,0,0.12),0_6px_12px_-3px_rgba(174,37,0,0.30)]"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
