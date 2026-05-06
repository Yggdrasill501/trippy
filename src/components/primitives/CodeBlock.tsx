import * as React from "react";

import { cn } from "@/lib/utils";

type CodeBlockProps = React.ComponentProps<"pre"> & {
  language?: string;
  filename?: string;
};

export function CodeBlock({ className, language, filename, children, ...props }: CodeBlockProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-muted/40 backdrop-blur-sm">
      {(language || filename) && (
        <div className="flex items-center justify-between border-b bg-background/40 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            {filename && <span className="ml-3 font-mono">{filename}</span>}
          </div>
          {language && <span className="font-mono uppercase tracking-wider">{language}</span>}
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto px-4 py-4 text-[13px] leading-6 font-mono text-foreground/90",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
