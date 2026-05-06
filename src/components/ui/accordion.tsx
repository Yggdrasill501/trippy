import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type AccordionContextValue = {
  type: "single" | "multiple";
  open: Set<string>;
  toggle: (value: string) => void;
  baseId: string;
  collapsible: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion subcomponents must be inside <Accordion>");
  return ctx;
}

type AccordionProps = React.ComponentProps<"div"> & {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
};

function Accordion({
  type = "single",
  defaultValue,
  collapsible = true,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(() => {
    const init = defaultValue == null ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return new Set(init);
  });
  const baseId = React.useId();

  const toggle = React.useCallback(
    (value: string) => {
      setOpen((prev) => {
        const next = new Set(prev);
        const isOpen = next.has(value);
        if (type === "single") {
          next.clear();
          if (!isOpen) next.add(value);
          else if (collapsible) next.delete(value);
          else next.add(value);
        } else {
          if (isOpen) next.delete(value);
          else next.add(value);
        }
        return next;
      });
    },
    [type, collapsible],
  );

  return (
    <AccordionContext.Provider value={{ type, open, toggle, baseId, collapsible }}>
      <div data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />
    </AccordionContext.Provider>
  );
}

type AccordionItemContextValue = { value: string };
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useItemContext() {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error("AccordionTrigger/Content must be inside <AccordionItem>");
  return ctx;
}

type AccordionItemProps = React.ComponentProps<"div"> & { value: string };

function AccordionItem({ value, className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div data-slot="accordion-item" className={cn("border-b last:border-b-0", className)} {...props} />
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  const ctx = useAccordionContext();
  const item = useItemContext();
  const isOpen = ctx.open.has(item.value);
  const triggerId = `${ctx.baseId}-trigger-${item.value}`;
  const contentId = `${ctx.baseId}-content-${item.value}`;
  return (
    <h3 className="flex">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => ctx.toggle(item.value)}
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-all",
          "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
    </h3>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<"div">) {
  const ctx = useAccordionContext();
  const item = useItemContext();
  const isOpen = ctx.open.has(item.value);
  const triggerId = `${ctx.baseId}-trigger-${item.value}`;
  const contentId = `${ctx.baseId}-content-${item.value}`;
  return (
    <div
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      hidden={!isOpen}
      className={cn("overflow-hidden text-sm text-muted-foreground", className)}
      {...props}
    >
      <div className="pb-4 pr-8 leading-relaxed">{children}</div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
