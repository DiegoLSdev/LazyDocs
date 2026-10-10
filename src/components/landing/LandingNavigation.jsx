import React from "react";
import { ArrowRight, ArrowUpDown, FileText, Folder, ListTree, Map as MapIcon, RefreshCw } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import LandingStory from "./LandingStory";

const tree = [
  { depth: 0, kind: "folder", name: "getting-started/" },
  { depth: 1, kind: "file", name: "introduction.md" },
  { depth: 1, kind: "file", name: "quick-start.md" },
  { depth: 0, kind: "folder", name: "guides/" },
  { depth: 1, kind: "file", name: "writing.md" },
  { depth: 1, kind: "file", name: "deploying.md", fresh: true },
  { depth: 0, kind: "config", name: "_sidebar-order.json" },
];

const sidebar = [
  { title: "Getting Started", items: ["Introduction", "Quick Start"] },
  { title: "Guides", items: ["Writing", "Deploying"] },
];

function Panel({ label, children, className }) {
  return (
    <div className={cn("lz-window flex flex-col overflow-hidden rounded-[16px] bg-background", className)}>
      <p className="border-b border-border px-4 py-2.5 text-[12px] font-medium text-muted-foreground">{label}</p>
      <div className="flex-1 px-4 py-4">{children}</div>
    </div>
  );
}

export default function LandingNavigation() {
  const { t } = useLocale();

  const visual = (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] lg:-ml-6 xl:-ml-12">
      <Panel label={t("landing.navigation.files")}>
        <p className="lz-mono mb-2 text-[12px] font-semibold">public/docs/</p>
        <ul className="lz-mono space-y-1 text-[12px]">
          {tree.map((node) => {
            const Icon = node.kind === "folder" ? Folder : FileText;
            return (
              <li
                key={node.name}
                className={cn(
                  "flex items-center gap-2 rounded-md py-1 pr-2",
                  node.depth ? "pl-6" : "pl-1",
                  node.fresh && "bg-primary/10 text-primary dark:bg-primary/15",
                  node.kind === "config" && "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn("h-3.5 w-3.5 shrink-0", node.kind === "folder" ? "text-primary" : "opacity-60")}
                  aria-hidden="true"
                />
                <span className="truncate">{node.name}</span>
                {node.fresh && (
                  <span className="lz-sans ml-auto text-[10px] font-semibold uppercase tracking-wide">
                    {t("landing.navigation.fresh")}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="flex items-center justify-center gap-2 self-center sm:flex-col">
        <span className="lz-mono whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
          npm run dev
        </span>
        <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground sm:rotate-0" aria-hidden="true" />
        <span className="text-[11px] text-muted-foreground">{t("landing.navigation.generated")}</span>
      </div>

      <Panel label={t("landing.navigation.sidebar")}>
        <div className="h-full rounded-xl bg-sidebar/70 p-3">
          {sidebar.map((section) => (
            <div key={section.title} className="mb-3 last:mb-0">
              <p className="mb-1.5 text-[12px] font-semibold text-muted-foreground">{section.title}</p>
              <ul className="border-l border-border">
                {section.items.map((item) => {
                  const active = item === "Deploying";
                  return (
                    <li
                      key={item}
                      className={cn(
                        "-ml-px border-l py-1 pl-3 text-[13px]",
                        active ? "border-primary font-medium text-primary" : "border-transparent"
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );

  return (
    <LandingStory
      id="navigation"
      eyebrow="sidebar.json"
      eyebrowIcon={ListTree}
      title={t("landing.navigation.title")}
      titleAccent={t("landing.navigation.titleAccent")}
      lead={t("landing.navigation.lead")}
      points={t("landing.navigation.points")}
      icons={[ArrowUpDown, MapIcon, RefreshCw]}
      visual={visual}
      reverse
    />
  );
}
