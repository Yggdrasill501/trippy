import * as React from "react";

import { cn } from "@/lib/utils";

type TooltipProps = React.ComponentProps<"span"> & {
  content: React.ReactNode;
  side?: "top" | "bottom";
};

function Tooltip({ content, side = "top", className, children, ...props }: TooltipProps) {
  return (
    <span className={cn("group/tooltip relative inline-flex", className)} {...props}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-md border bg-popover px-2.5 py-1 text-xs text-popover-foreground shadow-md whitespace-nowrap",
          "opacity-0 scale-95 transition-all duration-150 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100",
          side === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
        )}
      >
        {content}
      </span>
    </span>
  );
}

export { Tooltip };
