import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Github, Languages, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import LandingButton from "./LandingButton";
import { docsRoutes, repoUrl, scrollToSection } from "./landing";

const sectionLinks = ["how", "writing", "themes", "features", "faq"];

const locales = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "pt", label: "PT", name: "Português" },
];

function LocalePill({ className }) {
  const { locale, setLocale, t } = useLocale();
  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <label
      className={cn(
        "relative inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-muted-foreground",
        "transition-colors hover:bg-foreground/[0.05] hover:text-foreground focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span aria-hidden="true">{current.label}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label={t("header.selectLanguage")}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function IconButton({ label, onClick, href, children, className, ...rest }) {
  const classes = cn(
    "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors",
    "hover:bg-foreground/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default function LandingNav({ config, isDark, onToggleDarkMode, scrolled }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const repo = repoUrl(config);
  const logo = config?.logo?.[isDark ? "dark" : "light"];
  const wordmark = config?.title?.[isDark ? "dark" : "light"];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "relative border-b transition-[background-color,border-color] duration-300",
          scrolled || open
            ? "border-border/80 bg-background/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label={t("landing.nav.label")}
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-8"
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t("landing.nav.home")}
          >
            {logo && <img src={logo} alt="" className="h-9 w-9 object-contain" />}
            {wordmark ? (
              <img src={wordmark} alt="" className="h-9 w-auto object-contain" />
            ) : (
              <span className="lz-display text-[18px] font-semibold tracking-[-0.03em]">{config?.siteName}</span>
            )}
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {sectionLinks.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  className="rounded-full px-3 py-1.5 text-[14px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
                >
                  {t(`landing.nav.${id}`)}
                </a>
              </li>
            ))}
            <li>
              <Link
                to={docsRoutes.start}
                className="rounded-full px-3 py-1.5 text-[14px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
              >
                {t("landing.nav.docs")}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <LocalePill className="hidden sm:inline-flex" />
            <IconButton label={t("header.toggleTheme")} onClick={onToggleDarkMode}>
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </IconButton>
            <IconButton label={t("landing.nav.github")} href={repo} className="hidden sm:inline-flex">
              <Github className="h-[18px] w-[18px]" />
            </IconButton>
            <LandingButton to={docsRoutes.start} size="sm" className="ml-1.5">
              {t("landing.nav.cta")}
            </LandingButton>
            <IconButton
              label={open ? t("landing.nav.closeMenu") : t("landing.nav.openMenu")}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="landing-menu"
              className="-mr-1.5 ml-0.5 text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconButton>
          </div>
        </nav>

        <div
          id="landing-menu"
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-border/80 bg-background shadow-[0_24px_48px_-24px_hsl(var(--foreground)/0.3)] lg:hidden"
        >
          <ul className="mx-auto max-w-[1200px] px-3 py-3 sm:px-6">
            {sectionLinks.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]"
                >
                  {t(`landing.nav.${id}`)}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-3">
              <Link
                to={docsRoutes.start}
                className="flex flex-1 items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]"
              >
                {t("landing.nav.docs")}
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </Link>
            </li>
            <li className="flex items-center justify-between px-1 pt-1 sm:hidden">
              <LocalePill />
              <IconButton label={t("landing.nav.github")} href={repo}>
                <Github className="h-[18px] w-[18px]" />
              </IconButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
