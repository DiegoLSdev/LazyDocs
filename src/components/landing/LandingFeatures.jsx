import React from "react";
import { Check, CornerDownLeft, Layers, Moon, Search, Sun } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import pt from "@/locales/pt.json";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { useThemes } from "./themes";

const translations = { en, es, fr, de, pt };

function Card({ className, title, text, visual, wide, delay }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn("lz-card flex flex-col overflow-hidden rounded-[24px]", wide && "md:col-span-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]", className)}
    >
      <div className={cn("px-6 pt-6 sm:px-7 sm:pt-7", wide && "md:flex md:flex-col md:justify-center md:pb-7")}>
        <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{title}</h3>
        <p className="mt-2 max-w-[440px] text-pretty text-[14.5px] leading-[1.55] text-muted-foreground">{text}</p>
      </div>
      <div className={cn("relative mt-7 flex-1 px-6 sm:px-7", wide && "md:mt-7 md:pl-0")}>{visual}</div>
    </Reveal>
  );
}

function Peek({ className, children, style }) {
  return (
    <div
      className={cn(
        "h-full min-h-[190px] overflow-hidden rounded-t-[14px] border border-b-0 border-border bg-background",
        "shadow-[0_-12px_32px_-20px_hsl(var(--foreground)/0.25)] dark:border-foreground/10",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function Kbd({ children }) {
  return (
    <kbd className="lz-mono inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1 text-[10px] text-muted-foreground">
      {children}
    </kbd>
  );
}

function SearchVisual({ s }) {
  const highlight = (title, match) => {
    if (!match || !title.includes(match)) return title;
    const [before, after] = title.split(match);
    return (
      <>
        {before}
        <mark className="rounded-sm bg-primary/20 px-0.5 text-foreground">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <Peek>
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-[14px]">
          {s.query}
          <span className="lz-caret ml-px inline-block h-[15px] w-[1.5px] translate-y-[3px] bg-foreground" />
        </span>
        <span className="ml-auto">
          <Kbd>esc</Kbd>
        </span>
      </div>
      <ul className="p-2">
        {s.results.map((result, i) => (
          <li
            key={result.title}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5", i === 0 && "bg-primary/10 dark:bg-primary/15")}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] text-muted-foreground">{result.section}</span>
              <span className="block truncate text-[13.5px] font-medium">{highlight(result.title, result.match)}</span>
            </span>
            {i === 0 && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          {s.navigate}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>↵</Kbd>
          {s.open}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>esc</Kbd>
          {s.close}
        </span>
      </div>
    </Peek>
  );
}

function LanguagesVisual() {
  const { locale, setLocale, t } = useLocale();
  return (
    <Peek className="p-2">
      <ul aria-label={t("header.selectLanguage")}>
        {Object.entries(translations).map(([code, dict]) => {
          const active = code === locale;
          return (
            <li key={code}>
              <button
                type="button"
                lang={code}
                aria-pressed={active}
                onClick={() => setLocale(code)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "bg-primary/10 dark:bg-primary/15" : "hover:bg-muted/70 dark:hover:bg-foreground/[0.04]"
                )}
              >
                <span
                  className={cn(
                    "lz-mono inline-flex h-6 w-8 items-center justify-center rounded-md text-[10.5px] font-semibold uppercase",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {code}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13.5px]">{dict.landing?.hero?.titleAccent}</span>
                {active && <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.75} aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </Peek>
  );
}

function SeoVisual({ s, config, isDark }) {
  const logo = config?.logo?.[isDark ? "dark" : "light"];
  return (
    <Peek className="px-5 py-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-inset ring-border">
          {logo && <img src={logo} alt="" className="h-5 w-5 object-contain" />}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[12.5px] font-medium">Your Docs</span>
          <span className="block truncate text-[11.5px] text-muted-foreground">docs.yourproject.dev › docs › quick-start</span>
        </span>
      </div>
      <p className="mt-2.5 text-[16px] font-medium text-primary">{s.resultTitle}</p>
      <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-muted-foreground">{s.resultText}</p>
      <div className="lz-mono mt-4 flex flex-wrap gap-1.5">
        {["og:image", "twitter:card", "JSON-LD", "sitemap.xml"].map((tag) => (
          <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[10.5px] text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </Peek>
  );
}

function MiniPage({ tokens, className }) {
  return (
    <div className={cn("lz-preview h-full bg-background p-4 text-foreground", className)} style={tokens}>
      <div className="h-2.5 w-16 rounded-full bg-foreground/80" />
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted-foreground/40" />
        <div className="h-1.5 w-4/5 rounded-full bg-muted-foreground/40" />
        <div className="h-1.5 w-3/5 rounded-full bg-muted-foreground/40" />
      </div>
      <div className="mt-4 h-12 rounded-md border border-border bg-muted p-2">
        <div className="h-1.5 w-3/4 rounded-full" style={{ background: "rgb(var(--code-keyword))" }} />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full" style={{ background: "rgb(var(--code-string))" }} />
      </div>
      <div className="mt-4 h-6 w-20 rounded-full bg-primary" />
    </div>
  );
}

function DarkModeVisual({ config }) {
  const themes = useThemes();
  const theme = themes?.find((item) => item.name === config?.colorTheme) || themes?.[0];
  return (
    <Peek className="relative grid grid-cols-2">
      <MiniPage tokens={theme?.light} />
      <MiniPage tokens={theme?.dark} className="border-l border-border" />
      <span className="absolute left-1/2 top-[46%] flex h-9 w-[68px] -translate-x-1/2 items-center justify-between rounded-full bg-card px-2.5 shadow-[0_0_0_1px_hsl(var(--border)),0_8px_20px_-8px_hsl(var(--foreground)/0.4)]">
        <Sun className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Moon className="h-4 w-4 text-primary" aria-hidden="true" />
      </span>
    </Peek>
  );
}

function CodeVisual({ copied }) {
  const lines = [
    [["keyword", "function "], ["function", "hello"], ["punct", "() {"]],
    [["text", "  console."], ["function", "log"], ["punct", "("], ["string", "'Hello, LazyDocs!'"], ["punct", ");"]],
    [["punct", "}"]],
  ];
  const color = {
    keyword: "rgb(var(--code-keyword))",
    function: "rgb(var(--code-function))",
    string: "rgb(var(--code-string))",
    punct: "rgb(var(--code-punctuation))",
    text: "rgb(var(--code-text))",
  };
  return (
    <Peek style={{ background: "rgb(var(--code-background))" }}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="lz-mono text-[11px] text-muted-foreground">hello.js</span>
        <span className="relative inline-flex items-center gap-1.5 rounded-md bg-background px-2 py-1 text-[11px] font-medium ring-1 ring-inset ring-border">
          <Check className="h-3 w-3 text-primary" strokeWidth={3} aria-hidden="true" />
          {copied}
        </span>
      </div>
      <div className="lz-mono py-3 text-[12px] leading-[1.8]">
        {lines.map((line, i) => (
          <div key={i} className="flex whitespace-pre px-4">
            <span className="w-5 select-none text-right italic opacity-50" style={{ color: "rgb(var(--code-comment))" }}>
              {i + 1}
            </span>
            <span className="pl-4">
              {line.map(([kind, text], j) => (
                <span key={j} style={{ color: color[kind], fontWeight: kind === "keyword" ? 600 : undefined }}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </Peek>
  );
}

export default function LandingFeatures({ config, isDark }) {
  const { t } = useLocale();

  return (
    <section id="features" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-28 lg:py-32" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow icon={Layers}>features/</Eyebrow>
          <h2
            id="features-title"
            className="lz-display mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[48px]"
          >
            {t("landing.features.title")} <span className="lz-quiet">{t("landing.features.titleAccent")}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          <Card
            wide
            className="lg:col-span-2"
            title={t("landing.features.search.title")}
            text={t("landing.features.search.text")}
            visual={<SearchVisual s={t("landing.features.search")} />}
          />
          <Card
            delay={80}
            title={t("landing.features.i18n.title")}
            text={t("landing.features.i18n.text")}
            visual={<LanguagesVisual />}
          />
          <Card
            title={t("landing.features.seo.title")}
            text={t("landing.features.seo.text")}
            visual={<SeoVisual s={t("landing.features.seo")} config={config} isDark={isDark} />}
          />
          <Card
            delay={80}
            title={t("landing.features.dark.title")}
            text={t("landing.features.dark.text")}
            visual={<DarkModeVisual config={config} />}
          />
          <Card
            delay={160}
            title={t("landing.features.code.title")}
            text={t("landing.features.code.text")}
            visual={<CodeVisual copied={t("landing.features.code.copied")} />}
          />
        </div>
      </div>
    </section>
  );
}
