import React from "react";
import { Braces, Check, Code2, Hash } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import LandingStory from "./LandingStory";

const C = {
  comment: { color: "rgb(var(--code-comment))" },
  keyword: { color: "rgb(var(--code-keyword))" },
  string: { color: "rgb(var(--code-string))" },
  heading: { color: "rgb(var(--code-function))" },
  punct: { color: "rgb(var(--code-punctuation))" },
};

function splitDist(text, renderCode) {
  const [before, ...rest] = text.split("dist");
  if (!rest.length) return text;
  return (
    <>
      {before}
      {renderCode("dist")}
      {rest.join("dist")}
    </>
  );
}

function PaneLabel({ children }) {
  return (
    <span className="lz-mono inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-inset ring-border">
      {children}
    </span>
  );
}

function SourcePane({ s, label }) {
  const rows = [
    ["npm run dev", s.rowDev],
    ["npm run build", s.rowBuild],
  ];
  const pad = (text, size) => text.padEnd(size, " ");
  const w1 = Math.max(s.tableCommand.length, 15) + 2;

  return (
    <div className="lz-window overflow-hidden rounded-[16px] bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="lz-mono text-[11.5px] text-muted-foreground">guides/deploying.md</span>
        <PaneLabel>{label}</PaneLabel>
      </div>
      <div className="lz-mono overflow-hidden whitespace-pre px-4 py-4 text-[11.5px] leading-[1.75] sm:text-[12px]">
        <p style={C.comment}>---</p>
        <p>
          <span style={C.keyword}>title</span>: <span style={C.string}>{s.title}</span>
        </p>
        <p>
          <span style={C.keyword}>description</span>: <span style={C.string}>{s.description}</span>
        </p>
        <p style={C.comment}>---</p>
        <p>&nbsp;</p>
        <p>{splitDist(s.intro, (word) => <span style={C.string}>`{word}`</span>)}</p>
        <p>&nbsp;</p>
        <p style={C.punct}>
          | {pad(s.tableCommand, w1 - 2)} | {s.tableWhat}
        </p>
        <p style={C.punct}>
          | {"-".repeat(w1 - 2)} | {"-".repeat(12)}
        </p>
        {rows.map(([cmd, what]) => (
          <p key={cmd}>
            <span style={C.punct}>| </span>
            <span style={C.string}>{pad(`\`${cmd}\``, w1 - 2)}</span>
            <span style={C.punct}> | </span>
            {what}
          </p>
        ))}
        <p>&nbsp;</p>
        <p>
          <span style={C.keyword}>- [x]</span> {s.taskDone}
        </p>
        <p>
          <span style={C.keyword}>- [ ]</span> {s.taskTodo}
        </p>
      </div>
    </div>
  );
}

function RenderedPane({ s, label }) {
  return (
    <div className="lz-window overflow-hidden rounded-[16px] bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-[11.5px] text-muted-foreground">docs.yourproject.dev/docs/guides/deploying</span>
        <PaneLabel>{label}</PaneLabel>
      </div>
      <div className="px-5 py-5 sm:px-6">
        <p className="border-b border-border pb-2 text-[24px] font-bold tracking-[-0.02em]">{s.title}</p>
        <p className="mt-2 text-[14px] text-muted-foreground">{s.description}</p>
        <p className="mt-4 text-[13.5px] leading-[1.6]">
          {splitDist(s.intro, (word) => (
            <code className="lz-mono rounded bg-muted px-1 py-0.5 text-[11.5px] font-semibold">{word}</code>
          ))}
        </p>

        <table className="mt-4 w-full border-collapse text-left text-[12.5px]">
          <thead>
            <tr>
              <th className="border border-border bg-muted px-3 py-1.5 font-semibold">{s.tableCommand}</th>
              <th className="border border-border bg-muted px-3 py-1.5 font-semibold">{s.tableWhat}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["npm run dev", s.rowDev],
              ["npm run build", s.rowBuild],
            ].map(([cmd, what]) => (
              <tr key={cmd}>
                <td className="border border-border px-3 py-1.5">
                  <code className="lz-mono rounded bg-muted px-1 py-0.5 text-[11px] font-semibold">{cmd}</code>
                </td>
                <td className="border border-border px-3 py-1.5 text-foreground/85">{what}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="mt-4 space-y-1.5 text-[13px]">
          <li className="flex items-center gap-2">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-primary text-primary-foreground">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
            </span>
            <span className="text-muted-foreground line-through decoration-muted-foreground/50">{s.taskDone}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-[4px] ring-1 ring-inset ring-input" />
            {s.taskTodo}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function LandingWriting() {
  const { t } = useLocale();
  const sample = t("landing.writing.sample");

  const visual = (
    <div className="relative sm:pb-16 sm:pr-10 lg:-mr-6 xl:-mr-12">
      <div className="sm:w-[78%]">
        <SourcePane s={sample} label={t("landing.writing.source")} />
      </div>
      <div className="relative mt-4 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:w-[64%]">
        <RenderedPane s={sample} label={t("landing.writing.rendered")} />
      </div>
    </div>
  );

  return (
    <LandingStory
      id="writing"
      eyebrow="writing.md"
      eyebrowIcon={Hash}
      title={t("landing.writing.title")}
      titleAccent={t("landing.writing.titleAccent")}
      lead={t("landing.writing.lead")}
      points={t("landing.writing.points")}
      icons={[Braces, Code2, Hash]}
      visual={visual}
    />
  );
}
