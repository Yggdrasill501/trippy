import * as React from "react";

import { cn } from "@/lib/utils";

type GradientBlurProps = React.ComponentProps<"div"> & {
  variant?: "hero" | "mid" | "soft";
};

export function GradientBlur({ variant = "hero", className, ...props }: GradientBlurProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      {...props}
    >
      {variant === "hero" && (
        <>
          <div className="accent-glow absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 opacity-40 blur-3xl dark:opacity-30" />
          <div className="accent-glow-soft absolute top-1/3 right-[-10%] h-[420px] w-[420px] opacity-30 blur-3xl dark:opacity-25" />
          <div className="accent-glow-soft absolute top-[60%] left-[-10%] h-[360px] w-[360px] opacity-30 blur-3xl dark:opacity-20" />
        </>
      )}
      {variant === "mid" && (
        <>
          <div className="accent-glow absolute top-0 left-1/4 h-[420px] w-[420px] opacity-25 blur-3xl dark:opacity-20" />
          <div className="accent-glow-soft absolute bottom-0 right-1/4 h-[420px] w-[420px] opacity-20 blur-3xl dark:opacity-15" />
        </>
      )}
      {variant === "soft" && (
        <div className="accent-glow-soft absolute inset-0 opacity-15 blur-3xl dark:opacity-10" />
      )}
    </div>
  );
}
