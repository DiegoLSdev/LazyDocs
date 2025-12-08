import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Zap, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrowserMockup from "./BrowserMockup";
import { useLocale } from "../contexts/LocaleContext";
import LanguageSelector from "./LanguageSelector";

/**
 * Hero component for the home page
 * Modern design with browser mockup preview
 */
const Hero = ({ config, isDark, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <LanguageSelector className="absolute top-20 right-20 " />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 justify-center gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="animate-fade-up">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight text-primary">
                  {t("hero.title")}
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient-gold leading-tight">
                  {t("hero.titleGradient")}
                </span>
              </h1>

              <p className="animate-fade-up-delay-1 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                {t("hero.subtitle")}
                <br />
                <span className="text-secondary-foreground">
                  {t("hero.subtitleHighlight")}
                </span>
              </p>
            </div>

            {/* CTA buttons */}
            <div className="animate-fade-up-delay-2 flex flex-wrap gap-4">
              <Button
                variant="hero"
                size="lg"
                className="group  z-50"
                onClick={() => navigate("/docs/getting-started/introduction")}
              >
                <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t("hero.cta.start")}
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                className="group"
                onClick={() => navigate("/docs/getting-started/quick-start")}
              >
                <Zap className="w-5 h-5 transition-transform group-hover:rotate-12" />
                {t("hero.cta.quickGuide")}
              </Button>
            </div>

            {/* GitHub badge */}
            <div className="animate-fade-up-delay-3 flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">
                {t("hero.starCta.text")}
              </span>
              <a
                href={
                  config?.repository ||
                  "https://github.com/DiegoLSdev/LazyDocs"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {t("hero.starCta.action")}
              </a>
              <div
                className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 hover:bg-secondary/80 transition-all hover:scale-105 cursor-pointer"
                onClick={() =>
                  window.open(
                    config?.repository ||
                      "https://github.com/DiegoLSdev/LazyDocs",
                    "_blank"
                  )
                }
              >
                <Github className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {t("hero.starCta.button")}
                </span>
                <Star className="w-3 h-3 text-primary fill-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right content - Browser mockup */}
          <div className="animate-fade-up-delay-4 flex justify-center lg:justify-end">
            <BrowserMockup isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
