import React, { useState } from "react";
import { ArrowRight, Moon, Palette, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import DocsWindow from "./DocsWindow";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { useThemes } from "./themes";
import { docsRoutes } from "./landing";

const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

function Swatch({ tokens }) {
  if (!tokens) return null;
  return (
    <span
      className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-foreground/10"
      style={{ background: `hsl(${tokens["--background"]})` }}
      aria-hidden="true"
    >
      <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: `hsl(${tokens["--primary"]})` }} />
      <span
        className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-full"
        style={{ background: `hsl(${tokens["--foreground"]})` }}
      />
    </span>
  );
}

function ModeSwitch({ mode, onChange, t }) {
  const options = [
    { value: "light", icon: Sun, label: t("landing.themes.light") },
    { value: "dark", icon: Moon, label: t("landing.themes.dark") },
  ];
  return (
    <div
      className="inline-flex rounded-full bg-muted/70 p-1 ring-1 ring-inset ring-border/80 dark:bg-foreground/[0.05] dark:ring-foreground/10"
      role="group"
      aria-label={t("landing.themes.mode")}
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={mode === value}
          onClick={() => onChange(value)}
          className={cn(
            "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,box-shadow]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            mode === value
              ? "bg-background text-foreground shadow-[0_1px_2px_hsl(var(--foreground)/0.12)] dark:bg-foreground/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function LandingThemes({ config, isDark }) {
  const { t } = useLocale();
  const themes = useThemes();
  const [picked, setPicked] = useState(null);
  const [pickedMode, setPickedMode] = useState(null);

  const mode = pickedMode ?? (isDark ? "dark" : "light");
  const current =
    themes?.find((theme) => theme.name === picked) ||
    themes?.find((theme) => theme.name === config?.colorTheme) ||
    themes?.[0];
  const tokens = current?.[mode];

  const describe = (name) => {
    const key = `landing.themes.names.${name}`;
    const text = t(key);
    return text === key ? t("landing.themes.fallback") : text;
  };

  return (
    <section
      id="themes"
      className="scroll-mt-20 border-y border-border/80 bg-muted/30 px-5 py-24 sm:px-8 sm:py-28 lg:py-32 dark:bg-foreground/[0.015]"
      aria-labelledby="themes-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-[860px] text-center">
          <Eyebrow icon={Palette}>themes/*.css</Eyebrow>
          <h2
            id="themes-title"
            className="lz-display mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[52px]"
          >
            {t("landing.themes.title")} <span className="lz-quiet sm:block">{t("landing.themes.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[17px] leading-[1.6] text-muted-foreground">
            {t("landing.themes.lead")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex min-w-0 flex-col gap-6 lg:col-span-4">
            <div>
              <p className="mb-3 text-[13px] font-medium text-muted-foreground">{t("landing.themes.pick")}</p>
              <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-1 [&::-webkit-scrollbar]:hidden">
                {(themes || []).map((theme) => {
                  const active = theme.name === current?.name;
                  return (
                    <li key={theme.name} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setPicked(theme.name)}
                        className={cn(
                          "flex w-full min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl p-3 text-left transition-[background-color,box-shadow]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "bg-card shadow-[0_0_0_1.5px_hsl(var(--primary)),0_8px_24px_-12px_hsl(var(--primary)/0.45)] dark:bg-foreground/[0.05]"
                            : "ring-1 ring-inset ring-border/80 hover:bg-card/70 dark:ring-foreground/10 dark:hover:bg-foreground/[0.03]"
                        )}
                      >
                        <Swatch tokens={theme[mode]} />
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 text-[14.5px] font-semibold">
                            {capitalize(theme.name)}
                            {theme.name === config?.colorTheme && (
                              <span className="lz-mono rounded bg-primary/10 px-1.5 py-px text-[10px] font-medium text-primary">
                                config
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">{describe(theme.name)}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[13px] font-medium text-muted-foreground">{t("landing.themes.mode")}</p>
              <ModeSwitch mode={mode} onChange={setPickedMode} t={t} />
            </div>

            <p className="hidden text-pretty text-[14px] leading-[1.6] text-muted-foreground lg:block">
              {t("landing.themes.custom")}{" "}
              <Link to={docsRoutes.themes} className="group inline-flex items-center gap-1 font-medium text-foreground">
                {t("landing.themes.learnMore")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </p>
          </Reveal>

          <Reveal delay={120} className="min-w-0 lg:col-span-8">
            <div className="lz-preview rounded-[22px]" style={tokens}>
              <DocsWindow config={config} dark={mode === "dark"} compact className="h-[420px] sm:h-[500px]" />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-muted-foreground">{t("landing.themes.configHint")}</p>
              <code className="lz-mono inline-flex w-fit items-center rounded-full bg-card px-3.5 py-1.5 text-[12.5px] ring-1 ring-inset ring-border dark:bg-foreground/[0.04] dark:ring-foreground/10">
                <span style={{ color: "rgb(var(--code-variable))" }}>"colorTheme"</span>
                <span className="text-muted-foreground">:&nbsp;</span>
                <span style={{ color: "rgb(var(--code-string))" }}>"{current?.name ?? "brownie"}"</span>
              </code>
            </div>

            <p className="mt-6 text-pretty text-[14px] leading-[1.6] text-muted-foreground lg:hidden">
              {t("landing.themes.custom")}{" "}
              <Link to={docsRoutes.themes} className="font-medium text-foreground underline-offset-4 hover:underline">
                {t("landing.themes.learnMore")}
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
