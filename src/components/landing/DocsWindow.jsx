import React from "react";
import { ChevronRight, Copy, Home, Languages, Lock, Moon, Search, Sun } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";

const codeLines = [
  [["comment", "---"]],
  [["keyword", "title"], ["punct", ": "], ["string", "My first page"]],
  [["keyword", "description"], ["punct", ": "], ["string", "Hello from Markdown"]],
  [["comment", "---"]],
  [],
  [["function", "# Welcome"]],
  [],
  [["text", "Write it like a "], ["keyword", "**README**"], ["text", ". That's it."]],
];

const tokenColor = {
  comment: "rgb(var(--code-comment))",
  keyword: "rgb(var(--code-keyword))",
  string: "rgb(var(--code-string))",
  function: "rgb(var(--code-function))",
  punct: "rgb(var(--code-punctuation))",
  text: "rgb(var(--code-text))",
};

function TrafficLights() {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-[11px] w-[11px] rounded-full bg-foreground/15 ring-1 ring-inset ring-foreground/10" />
      ))}
    </div>
  );
}

export default function DocsWindow({ config, dark = false, compact = false, className, style }) {
  const { t, locale } = useLocale();
  const m = t("landing.mock");
  const logo = config?.logo?.[dark ? "dark" : "light"];
  const wordmark = config?.title?.[dark ? "dark" : "light"];

  return (
    <div
      role="img"
      aria-label={m.aria}
      className={cn(
        "lz-window relative flex select-none flex-col overflow-hidden rounded-[18px] bg-background text-left text-foreground",
        className
      )}
      style={style}
    >
      <div className="relative flex h-11 shrink-0 items-center gap-3 border-b border-border bg-muted/50 px-4">
        <TrafficLights />
        <div className="mx-auto flex h-7 min-w-0 max-w-[420px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-background/80 px-3 text-[11.5px] text-muted-foreground ring-1 ring-inset ring-border/80">
          <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">
            docs.yourproject.dev<span className="hidden sm:inline">/docs/getting-started/quick-start</span>
          </span>
        </div>
        <div className="hidden w-[45px] sm:block" />
        <span className="absolute -bottom-px left-0 h-[2px] w-[38%] bg-primary" />
      </div>

      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          {logo && <img src={logo} alt="" className="h-7 w-7 object-contain" draggable="false" />}
          {wordmark ? (
            <img src={wordmark} alt="" className="h-7 w-auto object-contain" draggable="false" />
          ) : (
            <span className="text-[15px] font-semibold">{config?.siteName}</span>
          )}
        </div>
        <div className="flex-1" />
        {!compact && (
          <div className="hidden items-center gap-4 text-[12.5px] font-medium md:flex">
            <span>{m.docs}</span>
            <span>GitHub</span>
          </div>
        )}
        <div className="hidden h-8 w-44 items-center gap-2 rounded-md border border-input px-2.5 text-[12px] text-muted-foreground sm:flex">
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="flex-1">{m.search}</span>
          <kbd className="lz-mono rounded border border-border bg-muted px-1 text-[10px]">⌘K</kbd>
        </div>
        <Search className="h-4 w-4 text-muted-foreground sm:hidden" aria-hidden="true" />
        {!compact && (
          <span className="hidden h-8 items-center gap-1 rounded-md border border-input px-2 text-[12px] lg:inline-flex">
            <Languages className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            {locale.toUpperCase()}
          </span>
        )}
        {dark ? (
          <Sun className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </div>

      <div className="relative flex min-h-0 flex-1">
        <aside
          className={cn(
            "hidden shrink-0 border-r border-border bg-sidebar/60 px-4 py-6 md:block",
            compact ? "w-[190px]" : "w-[210px]"
          )}
        >
          {m.sections.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{section.title}</p>
              <ul className="space-y-0.5 border-l border-border">
                {section.items.map((item) => {
                  const active = item === m.title;
                  return (
                    <li
                      key={item}
                      className={cn(
                        "-ml-px border-l py-1 pl-3 text-[12.5px]",
                        active ? "border-primary font-medium text-primary" : "border-transparent text-foreground/80"
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <div className={cn("min-w-0 flex-1 px-5 py-6", compact ? "sm:px-7" : "sm:px-9 sm:py-7")}>
          <p className="flex flex-wrap items-center gap-1 text-[11.5px] text-muted-foreground">
            <Home className="h-3 w-3" aria-hidden="true" />
            {m.breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb}>
                <span className={i === m.breadcrumbs.length - 1 ? "text-foreground" : undefined}>{crumb}</span>
                {i < m.breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </p>

          <p className="mt-4 border-b border-border pb-2 text-[26px] font-bold tracking-[-0.02em] sm:text-[30px]">
            {m.title}
          </p>
          <p className="mt-3 text-[13.5px] text-muted-foreground sm:text-[14.5px]">{m.description}</p>

          <p className="mt-6 text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px]">{m.heading}</p>
          <p className="mt-2 text-[13px] leading-[1.65] text-foreground/85">
            {m.paragraphStart}{" "}
            <code className="lz-mono rounded bg-muted px-1 py-0.5 text-[11.5px] font-semibold">public/docs/</code>{" "}
            {m.paragraphEnd}
          </p>

          <div
            className="mt-4 overflow-hidden rounded-lg border border-border"
            style={{ background: "rgb(var(--code-background))" }}
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <span className="lz-mono text-[11px] text-muted-foreground">public/docs/my-page.md</span>
              <Copy className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="lz-mono py-2.5 text-[11.5px] leading-[1.7]">
              {codeLines.map((line, i) => (
                <div key={i} className="flex whitespace-pre px-3">
                  <span className="w-6 shrink-0 select-none text-right italic opacity-50" style={{ color: tokenColor.comment }}>
                    {i + 1}
                  </span>
                  <span className="pl-3">
                    {line.length === 0
                      ? " "
                      : line.map(([kind, text], j) => (
                          <span key={j} style={{ color: tokenColor[kind], fontWeight: kind === "keyword" ? 600 : undefined }}>
                            {text}
                          </span>
                        ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-[13px] leading-[1.65] text-foreground/85">{m.paragraph2}</p>
        </div>

        {!compact && (
          <aside className="hidden w-[190px] shrink-0 py-7 pr-5 lg:block">
            <p className="text-[12px] font-semibold">{m.onThisPage}</p>
            <ul className="mt-3 space-y-2 text-[12px] text-muted-foreground">
              {m.toc.map((item, i) => (
                <li key={item} className={cn(i === 1 && "font-medium text-primary", i > 1 && i < 4 && "pl-3")}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
    </div>
  );
}
