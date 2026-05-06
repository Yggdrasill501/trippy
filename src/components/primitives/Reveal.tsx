import * as React from "react";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number;
  as?: "div" | "section" | "header";
};

export function Reveal({ delay = 0, className, as: Comp = "div", style, ...props }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      data-in-view={inView ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={cn(
        "opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none",
        "data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
