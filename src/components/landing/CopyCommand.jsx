import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

export default function CopyCommand({ command, tone = "page", compact = false, className }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await writeClipboard(command);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const panel = tone === "panel";

  return (
    <div
      className={cn(
        "lz-mono group flex h-11 w-full max-w-full items-center gap-2.5 rounded-full pl-4 pr-1.5 text-left text-[12.5px]",
        panel
          ? "bg-[var(--cta-line)] text-[var(--cta-fg)] ring-1 ring-inset ring-[var(--cta-line)]"
          : "bg-card text-foreground ring-1 ring-inset ring-border shadow-[0_1px_2px_hsl(var(--foreground)/0.05)] dark:bg-foreground/[0.04] dark:ring-foreground/10",
        className
      )}
    >
      <span className={cn("select-none", panel ? "text-[var(--cta-muted)]" : "text-primary")} aria-hidden="true">
        $
      </span>
      <code className="min-w-0 flex-1 truncate">{command}</code>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "lz-sans inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full text-[12.5px] font-medium transition-colors",
          compact ? "w-8 justify-center" : "px-3",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          panel
            ? "text-[var(--cta-muted)] hover:bg-[var(--cta-line)] hover:text-[var(--cta-fg)]"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground dark:hover:bg-foreground/[0.06]"
        )}
        aria-label={copied ? t("landing.common.copied") : t("landing.common.copyCommand")}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span aria-live="polite" className={compact ? "sr-only" : undefined}>
          {copied ? t("landing.common.copied") : t("landing.common.copy")}
        </span>
      </button>
    </div>
  );
}
