import React from "react";
import { Check, FolderTree } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

function Terminal({ children }) {
  return (
    <div className="lz-mono h-full rounded-[14px] bg-foreground/[0.035] p-4 text-[12px] leading-[1.75] ring-1 ring-inset ring-border/70 dark:bg-black/25 dark:ring-foreground/[0.07]">
      {children}
    </div>
  );
}

const Prompt = ({ children }) => (
  <p className="truncate">
    <span className="select-none text-primary">$ </span>
    {children}
  </p>
);

const Ok = ({ children }) => (
  <p className="flex items-center gap-1.5 truncate text-muted-foreground">
    <Check className="h-3 w-3 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
    {children}
  </p>
);

function CloneVisual({ ready }) {
  return (
    <Terminal>
      <Prompt>cd LazyDocs && npm install</Prompt>
      <Prompt>npm run dev</Prompt>
      <Ok>Sidebar generated</Ok>
      <p className="mt-1 truncate">
        <span className="text-primary">➜</span> <span className="font-semibold">Local:</span>{" "}
        <span className="text-muted-foreground">http://localhost:3000/</span>
      </p>
      <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {ready}
      </p>
    </Terminal>
  );
}

function WriteVisual() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-background ring-1 ring-inset ring-border/80 dark:ring-foreground/[0.08]">
      <div className="lz-mono flex items-center gap-1.5 border-b border-border/80 px-3 py-2 text-[11px] text-muted-foreground">
        <FolderTree className="h-3 w-3" aria-hidden="true" />
        public/docs/guides/<span className="text-foreground">hello.md</span>
      </div>
      <div className="lz-mono flex-1 px-4 py-3 text-[12px] leading-[1.75]">
        <p style={{ color: "rgb(var(--code-comment))" }}>---</p>
        <p>
          <span style={{ color: "rgb(var(--code-keyword))" }}>title</span>: Hello
        </p>
        <p>
          <span style={{ color: "rgb(var(--code-keyword))" }}>order</span>:{" "}
          <span style={{ color: "rgb(var(--code-number))" }}>1</span>
        </p>
        <p style={{ color: "rgb(var(--code-comment))" }}>---</p>
        <p className="mt-1.5">
          <span style={{ color: "rgb(var(--code-function))" }}># Hello, docs</span>
          <span className="lz-caret ml-px inline-block h-[13px] w-[2px] translate-y-[2px] bg-primary" />
        </p>
      </div>
    </div>
  );
}

function DeployVisual({ deployTo }) {
  return (
    <Terminal>
      <Prompt>npm run build</Prompt>
      <Ok>Sidebar generated</Ok>
      <Ok>sitemap.xml</Ok>
      <Ok>dist/ ready</Ok>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="lz-sans text-[11px] text-muted-foreground">{deployTo}</span>
        {["Vercel", "Netlify", "GitHub Pages"].map((host) => (
          <span
            key={host}
            className="lz-sans rounded-md bg-background px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ring-border dark:bg-foreground/[0.06] dark:ring-foreground/10"
          >
            {host}
          </span>
        ))}
      </div>
    </Terminal>
  );
}

export default function LandingSteps() {
  const { t } = useLocale();
  const steps = t("landing.how.steps");
  const visuals = [
    <CloneVisual key="clone" ready={t("landing.how.ready")} />,
    <WriteVisual key="write" />,
    <DeployVisual key="deploy" deployTo={t("landing.how.deployTo")} />,
  ];

  return (
    <section id="how" className="scroll-mt-20 px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:pt-32" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="grid grid-cols-[minmax(0,1fr)] items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>how-it-works.md</Eyebrow>
            <h2
              id="how-title"
              className="lz-display mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[48px]"
            >
              {t("landing.how.title")} <span className="lz-quiet">{t("landing.how.titleAccent")}</span>
            </h2>
          </div>
          <p className="max-w-[460px] text-pretty text-[17px] leading-[1.6] text-muted-foreground lg:col-span-5 lg:pb-1.5">
            {t("landing.how.lead")}
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3 lg:mt-16">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="lz-card flex flex-col rounded-[22px] p-2">
              <div className="h-[176px]">{visuals[i]}</div>
              <div className="px-4 pb-4 pt-5">
                <p className="flex items-center gap-3">
                  <span className="lz-mono text-[12px] font-semibold text-primary">0{i + 1}</span>
                  <span className="h-px w-5 bg-border" aria-hidden="true" />
                  <span className="text-[16px] font-semibold tracking-[-0.01em]">{step.title}</span>
                </p>
                <p className="mt-2 text-pretty text-[14.5px] leading-[1.55] text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
