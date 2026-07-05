import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cornerVariants = cva("absolute", {
  variants: {
    position: {
      "top-left": "top-[-1] left-[-1]",
      "top-right": "top-[-1] right-[-1] rotate-90",
      "bottom-right": "bottom-[-1] right-[-1] rotate-180",
      "bottom-left": "bottom-[-1] left-[-1] -rotate-90",
    },
  },
  defaultVariants: {
    position: "top-left",
  },
});

function Corner({
  className,
  position = "top-left",
  ...props
}: React.SVGProps<SVGSVGElement> & VariantProps<typeof cornerVariants>) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(cornerVariants({ position, className }))}
      {...props}
    >
      <path
        d="M0.999091 -9.53674e-06H10.99V0.999081H6.99364C3.68294 0.999081 0.999091 3.68293 0.999091 6.99363V10.99L0 10.99L9.17105e-07 -9.53674e-06H0.999091V-9.53674e-06"
        // fill="currentColor"
        fill="#EDEDED"
      />
    </svg>
  );
}

export { Corner, cornerVariants };
