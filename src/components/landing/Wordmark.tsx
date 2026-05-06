import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  size?: "sm" | "md";
};

export function Wordmark({ className, size = "md" }: WordmarkProps) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2 font-serif-display tracking-tight text-foreground",
        size === "md" ? "text-xl" : "text-base",
        className,
      )}
      aria-label="Trippy"
    >
      <span className="relative inline-flex size-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-foreground/5 ring-1 ring-foreground/10 transition group-hover:bg-foreground/10" />
        <span className="relative size-1.5 rounded-full bg-foreground transition group-hover:scale-125" />
      </span>
      <span>Trippy</span>
    </a>
  );
}
