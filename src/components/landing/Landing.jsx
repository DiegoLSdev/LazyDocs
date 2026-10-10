import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocale } from "@/contexts/LocaleContext";
import LandingNav from "./LandingNav";
import LandingHero from "./LandingHero";
import LandingSteps from "./LandingSteps";
import LandingWriting from "./LandingWriting";
import LandingNavigation from "./LandingNavigation";
import LandingThemes from "./LandingThemes";
import LandingFeatures from "./LandingFeatures";
import LandingFaq from "./LandingFaq";
import LandingCta from "./LandingCta";
import LandingFooter from "./LandingFooter";
import "./landing.css";

export default function Landing({ config, isDark, onToggleDarkMode }) {
  const { t } = useLocale();

  const sentinel = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!sentinel.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lz relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
      <Helmet>
        <title>{t("landing.meta.title")}</title>
        <meta name="description" content={t("landing.meta.description")} />
        <meta property="og:title" content={t("landing.meta.title")} />
        <meta property="og:description" content={t("landing.meta.description")} />
      </Helmet>

      <span ref={sentinel} className="pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />

      <LandingNav config={config} isDark={isDark} onToggleDarkMode={onToggleDarkMode} scrolled={scrolled} />

      <main>
        <LandingHero config={config} isDark={isDark} />
        <LandingSteps />
        <LandingWriting />
        <LandingNavigation />
        <LandingThemes config={config} isDark={isDark} />
        <LandingFeatures config={config} isDark={isDark} />
        <LandingFaq />
        <LandingCta config={config} isDark={isDark} />
      </main>

      <LandingFooter config={config} isDark={isDark} />
    </div>
  );
}
