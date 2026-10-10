import React from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Eyebrow({ icon: Icon = FileText, children, className }) {
  return (
    <p
      className={cn(
        "lz-mono inline-flex items-center gap-2 rounded-full bg-card py-1 pl-1 pr-3 text-[12.5px] font-medium text-muted-foreground",
        "ring-1 ring-inset ring-border/80 dark:bg-foreground/[0.04] dark:ring-foreground/10",
        className
      )}
    >
      <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15">
        <Icon className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
      </span>
      {children}
    </p>
  );
}
