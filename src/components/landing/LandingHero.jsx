import React from "react";
import { Github } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import LandingButton from "./LandingButton";
import CopyCommand from "./CopyCommand";
import DocsWindow from "./DocsWindow";
import Reveal from "./Reveal";
import { cloneCommand, docsRoutes, repoUrl } from "./landing";

export default function LandingHero({ config, isDark }) {
  const { t } = useLocale();
  const stats = t("landing.stats");

  return (
    <section className="relative isolate pt-8 sm:pt-14 lg:pt-16" aria-labelledby="hero-title">
      <div className="lz-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]" aria-hidden="true" />

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_472px]">
          <div>
            <h1
              id="hero-title"
              className="lz-display lz-hero-in text-balance text-[44px] font-semibold leading-[0.98] tracking-[-0.034em] sm:text-[64px] xl:text-[80px]"
              style={{ "--hero-delay": "70ms" }}
            >
              <span className="block">{t("landing.hero.title")}</span>
              <span className="block text-primary">{t("landing.hero.titleAccent")}</span>
            </h1>
          </div>

          <div className="lg:pb-2">
            <p
              className="lz-hero-in max-w-[520px] text-pretty text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]"
              style={{ "--hero-delay": "140ms" }}
            >
              {t("landing.hero.subtitle")}
            </p>

            <div className="lz-hero-in mt-7 flex flex-wrap items-center gap-3" style={{ "--hero-delay": "210ms" }}>
              <LandingButton to={docsRoutes.start} size="lg" arrow>
                {t("landing.hero.ctaPrimary")}
              </LandingButton>
              <LandingButton href={repoUrl(config)} size="lg" variant="secondary">
                <Github className="h-4 w-4" aria-hidden="true" />
                {t("landing.hero.ctaSecondary")}
              </LandingButton>
            </div>

            <div className="lz-hero-in mt-5 max-w-[520px] lg:max-w-none" style={{ "--hero-delay": "280ms" }}>
              <CopyCommand command={cloneCommand(config)} compact />
              <p className="mt-2.5 pl-4 text-[12.5px] text-muted-foreground">{t("landing.hero.note")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-[1260px] px-3 sm:mt-20 sm:px-8">
        <div className="lz-glow pointer-events-none absolute inset-x-[4%] bottom-[10%] top-[4%] -z-10" aria-hidden="true" />
        <div className="lz-hero-window">
          <DocsWindow config={config} dark={isDark} className="h-[440px] sm:h-[560px] lg:h-[640px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-border/80 pt-8 sm:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/80 lg:pt-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} className="flex flex-col-reverse justify-end pr-4 lg:px-8 lg:first:pl-0">
              <dt className="mt-2 text-[14px] leading-snug text-muted-foreground">{stat.label}</dt>
              <dd className="lz-display text-[34px] font-semibold leading-none tracking-[-0.03em] sm:text-[40px]">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
