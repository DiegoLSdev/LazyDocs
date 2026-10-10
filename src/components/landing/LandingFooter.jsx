import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Github } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import AnimatedSignature from "@/components/animations/AnimatedSignature";
import { docsRoutes, repoUrl } from "./landing";

export default function LandingFooter({ config, isDark }) {
  const { t } = useLocale();
  const repo = repoUrl(config);
  const logo = config?.logo?.[isDark ? "dark" : "light"];
  const wordmark = config?.title?.[isDark ? "dark" : "light"];

  const columns = [
    {
      title: t("landing.footer.product"),
      links: [
        { label: t("landing.footer.introduction"), to: docsRoutes.start },
        { label: t("landing.footer.quickStart"), to: docsRoutes.quickStart },
        { label: t("landing.footer.themes"), to: docsRoutes.themes },
        { label: t("landing.footer.search"), to: docsRoutes.search },
      ],
    },
    {
      title: t("landing.footer.project"),
      links: [
        { label: t("landing.footer.github"), href: repo },
        { label: t("landing.footer.issues"), href: `${repo}/issues` },
        { label: t("landing.footer.license"), href: `${repo}/blob/main/LICENSE` },
      ],
    },
  ];

  const linkClass = "text-[14px] text-muted-foreground transition-colors hover:text-foreground";

  return (
    <footer className="px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2" aria-label={t("landing.nav.home")}>
              {logo && <img src={logo} alt="" className="h-9 w-9 object-contain" />}
              {wordmark ? (
                <img src={wordmark} alt="" className="h-9 w-auto object-contain" />
              ) : (
                <span className="lz-display text-[18px] font-semibold">{config?.siteName}</span>
              )}
            </Link>
            <p className="mt-4 max-w-[340px] text-pretty text-[14.5px] leading-[1.6] text-muted-foreground">
              {t("landing.footer.tagline")}
            </p>
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground ring-1 ring-inset ring-border transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-foreground/[0.06]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="md:col-span-3 lg:col-span-2">
              <p className="text-[13px] font-semibold">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex items-start md:col-span-12 lg:col-span-3 lg:justify-end">
            <div className="text-muted-foreground lg:text-right">
              <p className="text-[12.5px]">{t("landing.footer.madeBy")}</p>
              <AnimatedSignature width="132px" className="-ml-2 mt-1 opacity-80 lg:-mr-3 lg:ml-0" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center">
          {config?.footer?.copyright && <p className="text-[13px] text-muted-foreground">{config.footer.copyright}</p>}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              })
            }
            className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t("landing.footer.backToTop")}
          </button>
        </div>
      </div>
    </footer>
  );
}
