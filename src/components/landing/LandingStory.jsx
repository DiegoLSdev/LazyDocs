import React from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function LandingStory({ id, eyebrow, eyebrowIcon, title, titleAccent, lead, points, icons, visual, reverse }) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:py-24" aria-labelledby={`${id}-title`}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className={cn("lg:col-span-5", reverse && "lg:order-2")}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="lz-display mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[46px]"
          >
            {title} <span className="lz-quiet">{titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-pretty text-[17px] leading-[1.6] text-muted-foreground">{lead}</p>

          <ul className="mt-9 divide-y divide-border/80 border-y border-border/80">
            {points.map((point, i) => {
              const Icon = icons[i];
              return (
                <li key={point.title} className="py-4">
                  <h3 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em]">
                    <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
                    {point.title}
                  </h3>
                  <p className="mt-1.5 pl-[26px] text-pretty text-[14.5px] leading-[1.55] text-muted-foreground">
                    {point.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120} className={cn("lg:col-span-7", reverse && "lg:order-1")}>
          {visual}
        </Reveal>
      </div>
    </section>
  );
}
