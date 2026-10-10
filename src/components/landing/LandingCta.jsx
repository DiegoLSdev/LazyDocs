import React from "react";
import { Github } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import LandingButton from "./LandingButton";
import CopyCommand from "./CopyCommand";
import Reveal from "./Reveal";
import { cloneCommand, docsRoutes, repoUrl } from "./landing";

export default function LandingCta({ config, isDark }) {
  const { t } = useLocale();
  const logo = config?.logo?.[isDark ? "dark" : "light"];

  return (
    <section className="px-3 pb-6 pt-20 sm:px-8 sm:pb-10 sm:pt-24" aria-labelledby="cta-title">
      <Reveal className="relative mx-auto max-w-[1200px]">
        {logo && (
          <img
            src={logo}
            alt=""
            width="120"
            height="98"
            className="pointer-events-none absolute left-1/2 top-0 z-10 h-auto w-[104px] -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_10px_14px_rgb(0_0_0/0.25)] sm:w-[124px]"
          />
        )}

        <div className="lz-cta relative isolate overflow-hidden rounded-[28px] px-6 pb-16 pt-20 text-center sm:px-12 sm:pb-20 sm:pt-24">
          <div className="lz-cta-dots pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="lz-cta-glow pointer-events-none absolute inset-x-0 -bottom-48 -z-10 h-[420px]" aria-hidden="true" />

          <h2
            id="cta-title"
            className="lz-display mx-auto max-w-[980px] text-balance text-[34px] font-semibold leading-[1.04] tracking-[-0.034em] sm:text-[52px] lg:text-[60px]"
          >
            {t("landing.cta.title")}{" "}
            <span className="block text-[var(--cta-muted)]">{t("landing.cta.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[500px] text-pretty text-[17px] leading-[1.6] text-[var(--cta-muted)]">
            {t("landing.cta.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LandingButton to={docsRoutes.start} variant="inverse" size="lg" arrow>
              {t("landing.cta.primary")}
            </LandingButton>
            <LandingButton href={repoUrl(config)} variant="ghost" size="lg">
              <Github className="h-4 w-4" aria-hidden="true" />
              {t("landing.cta.secondary")}
            </LandingButton>
          </div>

          <div className="mx-auto mt-8 max-w-[480px]">
            <CopyCommand command={cloneCommand(config)} tone="panel" compact />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
