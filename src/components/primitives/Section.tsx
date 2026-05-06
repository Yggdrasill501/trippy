import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  bleed?: boolean;
};

export function Section({ className, bleed = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        bleed ? "py-0" : "py-20 md:py-28 lg:py-32",
        className,
      )}
      {...props}
    />
  );
}
