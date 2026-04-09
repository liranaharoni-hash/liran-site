"use client";

import { useState, useRef, useCallback } from "react";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

function Placeholder({ label, aspect = "3/2", icon }: { label: string; aspect?: string; icon?: string }) {
  return (
    <div className="relative overflow-hidden rounded-md flex items-center justify-center" style={{ aspectRatio: aspect, background: "linear-gradient(135deg, var(--placeholder-gradient-from) 0%, var(--placeholder-gradient-to) 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${label.replace(/\s/g, "-")}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${label.replace(/\s/g, "-")})`} />
      </svg>
      {icon && <span className="relative z-10 text-2xl">{icon}</span>}
    </div>
  );
}

function FlowDiagram({ steps }: { steps: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="border rounded px-3 py-2" style={{ borderColor: "var(--flow-step-border)", backgroundColor: "var(--flow-step-bg)" }}>
            <span className="font-mono text-[10px] tracking-[1px]" style={{ color: "var(--text-secondary)" }}>{step}</span>
          </div>
          {i < steps.length - 1 && <span className="text-[10px]" style={{ color: "var(--flow-connector, var(--gold-border))" }}>→</span>}
        </div>
      ))}
    </div>
  );
}

const icons = ["🤖", "✨", "📸", "📄"];

export default function CaseStudies() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const cases = t.cases;
  const sec = t.caseSections;

  const scrollToExpanded = useCallback(() => {
    requestAnimationFrame(() => {
      if (expandedRef.current) {
        const top = expandedRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  }, []);

  const handleCardClick = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
    setTimeout(scrollToExpanded, 50);
  }, [scrollToExpanded]);

  const remainingCards = openIndex !== null
    ? cases.map((cs, i) => ({ cs, i })).filter(({ i }) => i !== openIndex)
    : [];

  function CollapsedCard({ cs, idx }: { cs: (typeof cases)[number]; idx: number }) {
    return (
      <div
        className="border rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
        onClick={() => handleCardClick(idx)}
      >
        <div className="shrink-0">
          <Placeholder label={cs.cardTitle} icon={icons[idx]} aspect="3/2" />
        </div>
        <div className="p-5 flex items-start justify-between gap-4 flex-1">
          <div className="min-w-0 overflow-hidden">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-2" style={{ color: "var(--gold)" }}>{cs.cardLabel}</p>
            <h3 className="font-serif text-[22px] font-light mb-1 truncate" style={{ color: "var(--text-primary)" }}>{cs.cardTitle}</h3>
            <p className="font-sans text-[13px] font-light line-clamp-2" style={{ color: "var(--text-muted)" }}>{cs.cardDescriptor}</p>
          </div>
          <span className="shrink-0 w-8 h-8 flex items-center justify-center text-xl" style={{ color: "var(--text-dim)" }}>+</span>
        </div>
      </div>
    );
  }

  function ExpandedCard({ cs, idx }: { cs: (typeof cases)[number]; idx: number }) {
    return (
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-expanded)", backgroundColor: "var(--bg-surface)" }}>
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[3px] mb-1" style={{ color: "var(--gold)" }}>{cs.cardLabel}</p>
              <h3 className="font-serif text-[28px] font-light" style={{ color: "var(--text-primary)" }}>{cs.cardTitle}</h3>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setOpenIndex(null); }} className="shrink-0 w-9 h-9 flex items-center justify-center text-xl border rounded-full" style={{ color: "var(--text-dim)", borderColor: "var(--gold-border)" }} aria-label="Close">×</button>
          </div>

          {/* Hero line */}
          <p className="font-serif text-[20px] font-light leading-relaxed mb-8" style={{ color: "var(--text-primary)" }}>{cs.heroLine}</p>

          {/* Visual */}
          <div className="mb-8"><Placeholder label={`${cs.cardTitle}-exp`} aspect="21/9" icon={icons[idx]} /></div>

          {/* Flow */}
          <div className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.systemFlow}</p>
            <FlowDiagram steps={cs.flowSteps} />
          </div>

          {/* Problem / Insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.problem}</p>
              <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cs.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.insight}</p>
              <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cs.insight}</p>
            </div>
          </div>

          {/* System Design */}
          <div className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.systemDesign}</p>
            <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cs.systemDesign}</p>
          </div>

          {/* Behavioral Shift */}
          <div className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.behavioralShift}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-md p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-expanded)" }}>
                <p className="font-mono text-[9px] uppercase tracking-[2px] mb-2" style={{ color: "var(--text-faint)" }}>{sec.before}</p>
                <p className="font-sans text-[13px] font-light" style={{ color: "var(--text-muted)" }}>{cs.shiftBefore}</p>
              </div>
              <div className="border rounded-md p-4" style={{ borderColor: "var(--gold-border)", backgroundColor: "var(--gold-subtle)" }}>
                <p className="font-mono text-[9px] uppercase tracking-[2px] mb-2" style={{ color: "var(--gold)" }}>{sec.after}</p>
                <p className="font-sans text-[13px] font-light" style={{ color: "var(--text-secondary)" }}>{cs.shiftAfter}</p>
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.outcome}</p>
            <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cs.outcome}</p>
          </div>

          {/* Stats */}
          {"stats" in cs && cs.stats && (
            <div className="flex flex-wrap gap-8 mb-8">
              {cs.stats.map((stat: { label: string; value: string }) => (
                <div key={stat.label}>
                  <p className="font-serif text-[36px] font-light" style={{ color: "var(--stats-color, var(--gold))" }}>{stat.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[2px]" style={{ color: "var(--text-dim)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* What This Proves */}
          <div className="mb-8">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>{sec.whatThisProves}</p>
            <div className="ps-4 flex flex-col gap-2" style={{ borderInlineStart: "2px solid var(--gold-border)" }}>
              {cs.whatThisProves.map((item: string, j: number) => (
                <p key={j} className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="font-mono text-[10px] tracking-[1px]" style={{ color: "var(--text-dim)" }}>{cs.process}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="systems" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn><p className="label mb-4">{t.systems.label}</p></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="font-serif text-[38px] font-light mb-4" style={{ color: "var(--text-primary)" }}>{t.systems.title}</h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="font-sans text-[13px] italic font-light leading-relaxed mb-10" style={{ color: "var(--text-dim)" }}>{t.systems.intro}</p>
        </FadeIn>

        {openIndex === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((cs, i) => (
              <FadeIn key={i} delay={0.24 + i * 0.08}>
                <CollapsedCard cs={cs} idx={i} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div ref={expandedRef}>
              <ExpandedCard cs={cases[openIndex]} idx={openIndex} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {remainingCards.map(({ cs, i }) => (
                <CollapsedCard key={i} cs={cs} idx={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
