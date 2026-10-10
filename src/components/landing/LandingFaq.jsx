import React from "react";
import { Link } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { docsRoutes } from "./landing";

export default function LandingFaq() {
  const { t } = useLocale();
  const items = t("landing.faq.items");

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border/80 px-5 py-24 sm:px-8 sm:py-28 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow icon={HelpCircle}>faq.md</Eyebrow>
            <h2
              id="faq-title"
              className="lz-display mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[46px]"
            >
              {t("landing.faq.title")} <span className="lz-quiet">{t("landing.faq.titleAccent")}</span>
            </h2>
            <p className="mt-5 max-w-[360px] text-pretty text-[16px] leading-[1.6] text-muted-foreground">
              {t("landing.faq.lead")}
            </p>
            <p className="mt-8 text-[14px] text-muted-foreground">
              {t("landing.faq.more")}{" "}
              <Link to={docsRoutes.start} className="group inline-flex items-center gap-1 font-medium text-foreground">
                {t("landing.faq.moreLink")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-8">
          <Accordion.Root type="single" collapsible defaultValue="item-0" className="border-t border-border">
            {items.map((item, i) => (
              <Accordion.Item key={item.q} value={`item-${i}`} className="border-b border-border">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-4 py-5 text-left text-[16.5px] font-medium tracking-[-0.01em] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-[17.5px]">
                    <span className="lz-mono w-6 shrink-0 text-[12px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-border transition-[background-color,transform] duration-300 group-hover:bg-muted group-data-[state=open]:rotate-45 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground group-data-[state=open]:ring-primary dark:group-hover:bg-foreground/[0.06]">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[640px] pb-6 pl-10 pr-12 text-pretty text-[15px] leading-[1.65] text-muted-foreground">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
