"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "relative shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-muted-foreground">
        <span className="bg-white px-2">{children}</span>
      </div>
    </SeparatorPrimitive.Root>
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
