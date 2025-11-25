import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, Zap, Code, Search, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedSignature from "@/components/animations/AnimatedSignature.jsx";
import PreviewDarkMode from "/screenshots/prev-dark.png";
import PreviewLightMode from "/screenshots/prev-light.png";
import Header from "./Header";
import { useLocale } from "../contexts/LocaleContext";

/**
 * Hero component for the home page
 * Features sloth mascot and app preview with professional design
 */
function Hero({ config, isDark, onToggleDarkMode }) {
  const navigate = useNavigate();
  const { t } = useLocale();

  const features = [
    {
      icon: Book,
      title: t("hero.features.items.docs.title"),
      description: t("hero.features.items.docs.description"),
    },
    {
      icon: Zap,
      title: t("hero.features.items.fast.title"),
      description: t("hero.features.items.fast.description"),
    },
    {
      icon: Code,
      title: t("hero.features.items.syntax.title"),
      description: t("hero.features.items.syntax.description"),
    },
    {
      icon: Search,
      title: t("hero.features.items.search.title"),
      description: t("hero.features.items.search.description"),
    },
    {
      icon: Palette,
      title: t("hero.features.items.themes.title"),
      description: t("hero.features.items.themes.description"),
    },
    {
      icon: Globe,
      title: t("hero.features.items.i18n.title"),
      description: t("hero.features.items.i18n.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        config={config}
        isDark={isDark}
        onToggleDarkMode={onToggleDarkMode}
        hideSearch={true}
      />

      {/* Hero Section - Full Height */}
      <div className="relative overflow-hidden min-h-[calc(100vh-64px)] flex flex-col justify-between">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 py-12 md:py-20 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left side - Text content */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                {t("hero.title")}
                <span className="block pb-3 mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {t("hero.titleGradient")}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="w-5/6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.subtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate("/docs/getting-started/introduction")}
                >
                  <Book className="mr-2 h-5 w-5" />
                  {t("hero.cta.start")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => navigate("/docs/getting-started/quick-start")}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  {t("hero.cta.quickGuide")}
                </Button>
              </div>

              {/* Give a Star */}
              <div className="flex gap-2 m-0 p-0">
                <p className="text-sm md:text-base text-muted-foreground text-center sm:text-left">
                  {t("hero.starCta.text")}{" "}
                  <span className="font-semibold text-foreground">
                    {t("hero.starCta.action")}
                  </span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 group"
                  onClick={() =>
                    window.open(
                      "https://github.com/your-username/lazydocs",
                      "_blank"
                    )
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Star</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current group-hover:scale-110 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Right side - Preview showcase */}
            <div className="order-1 lg:order-2">
              <div className="relative lg:scale-110 xl:scale-125">
                {/* App preview with nice frame */}
                <div className="relative">
                  {/* Preview card */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-border bg-card shadow-2xl">
                    {/* Browser-like top bar */}
                    <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 ml-4 bg-background rounded px-3 py-1 text-xs text-muted-foreground">
                        http://lazydocs/docs/customization/sidebar
                      </div>
                    </div>

                    {/* Preview image - Changes based on theme */}
                    <div className="relative bg-background">
                      <img
                        src={isDark ? PreviewDarkMode : PreviewLightMode}
                        alt="LazyDocs App Preview"
                        className="w-full h-auto"
                      />

                      {/* Subtle overlay gradient for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("hero.features.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("hero.features.subtitle")}
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex justify-center items-center">
              <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("hero.footer.madeWith")}
              </p>
              <a
                href="https://www.linkedin.com/in/diegolajusticia/"
                target="_onblank"
              >
                <AnimatedSignature height="50px" />
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("hero.footer.docs")}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("hero.footer.github")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;
