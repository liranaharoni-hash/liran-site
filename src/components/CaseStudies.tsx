"use client";

import { useState, useRef, useCallback } from "react";
import FadeIn from "./FadeIn";

interface CaseStudy {
  icon: string;
  label: string;
  title: string;
  tagline: string;
  problem: string;
  insight: string;
  whatIDid: string;
  whyItWorked: string;
  outcome: string;
  process: string;
  flowSteps: string[];
  stats?: { label: string; value: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    icon: "🤖",
    label: "BEHAVIOR LAYER FOR CREATOR ECONOMY",
    title: "Bestie.ai",
    tagline: "A behavior layer for the creator economy",
    problem:
      "As creators grow, personal interaction becomes impossible to sustain. DMs, comments, repeated questions, and community conversations create a scalability bottleneck.",
    insight:
      "The real value of creator relationships is not content — it's the 1:1 layer of interaction. The challenge is how to scale relevant, personal interaction without flattening the creator's identity.",
    whatIDid:
      "Helped shape an AI-based creator extension system — a conversational layer built around the influencer's content, tone, knowledge, and boundaries. Designed to answer recurring questions in the creator's voice, surface relevant products, support conversion flows, and extract behavioral signals.",
    whyItWorked:
      "The system reframed AI from 'automation' into 'relationship scaling.' Not replacing the creator, but extending their presence across moments where human capacity breaks.",
    outcome:
      "Used in advanced pilots with creators and brands. Validated a strong product need around creator scalability, response workflows, and community continuity.",
    process:
      "Behavior system design · Creator persona modeling · AI conversation architecture · Adoption flow mapping",
    flowSteps: [
      "Creator posts content",
      "User initiates DM",
      "AI responds in creator's voice",
      "Signals extracted",
      "Recommendations adapt",
    ],
  },
  {
    icon: "📄",
    label: "POSITIONING SYSTEM, NOT CV POLISHING",
    title: "CV Repositioning System",
    tagline: "A system for restructuring how candidates are perceived",
    problem:
      "Many people are filtered out not because they lack relevant experience, but because they present it in a way that hiring managers and screening systems don't interpret correctly.",
    insight:
      "Hiring decisions are shaped by positioning, not just background. The same experience can look weak, unfocused, or highly relevant — depending on structure, emphasis, language, and hierarchy.",
    whatIDid:
      "Built a system that takes an existing CV and a target role, then restructures the candidate's experience according to decision-making signals: relevance, hierarchy, clarity, role fit, keyword logic, and business framing.",
    whyItWorked:
      "Instead of 'improving writing,' the system changes how the person is evaluated. It focuses on what should be kept, removed, reframed, or moved to the front — based on the specific job context.",
    outcome:
      "Tested across multiple profiles and role types — administrative, operations, project, and strategy-oriented candidates. Clearer, more role-aligned presentation that increases perceived relevance.",
    process:
      "AI-assisted analysis · Positioning frameworks · Decision-signal mapping · Iterative restructuring",
    flowSteps: [
      "Raw CV input",
      "Target role analysis",
      "Signal mapping",
      "Repositioned output",
      "Decision-readiness",
    ],
  },
  {
    icon: "✨",
    label: "CAMPAIGN → PARTICIPATORY EXPERIENCE",
    title: "SodaStream AI Experience",
    tagline: "Turning a campaign into a participatory product-like experience",
    problem:
      "Launching a premium SodaStream machine with limited production budget. The challenge: generate high engagement and product desire without a traditional large-scale shoot.",
    insight:
      "Instead of building a campaign people only watch, build an experience they actively participate in.",
    whatIDid:
      "Designed a participatory AI-based content experience that allowed users to generate their own branded visuals while keeping the product presence controlled and consistent.",
    whyItWorked:
      "Moved the audience from passive viewing into active interaction. Users were invited to create around the product — deepening engagement and making the experience shareable.",
    outcome:
      "~90,000 sessions · ~43,000 interactions · 18.6% engagement rate.",
    process:
      "AI content generation · Structured interaction design · Behavior-driven campaign architecture",
    flowSteps: [
      "Campaign brief",
      "AI visual engine",
      "User creates content",
      "Social sharing",
      "Engagement metrics",
    ],
    stats: [
      { label: "Sessions", value: "90K" },
      { label: "Interactions", value: "43K" },
      { label: "Engagement", value: "18.6%" },
    ],
  },
  {
    icon: "📸",
    label: "AI PRODUCTION SYSTEM",
    title: "Studio48",
    tagline: "AI production as a repeatable system",
    problem:
      "Traditional fashion and product shoots are slow, expensive, and hard to scale. Small brands need high-quality visual output but can't afford traditional production cycles.",
    insight:
      "Brands need output, not shoots. If AI generation is positioned as complementary — not replacement — it becomes scalable.",
    whatIDid:
      "Built an AI-powered visual production service for Israeli fashion boutiques. Developed the brand, playbook, outreach templates, and delivered real client work using AI generation tools.",
    whyItWorked:
      "Production became scalable and repeatable. By framing AI as a complement to traditional shoots, adoption barriers dropped significantly.",
    outcome:
      "Active client engagements delivered. Tiered pricing model validated. Pipeline and automation tools in development.",
    process:
      "AI image generation pipelines · Brand system design · Client workflow automation · Adoption strategy",
    flowSteps: [
      "Client brief",
      "AI generation pipeline",
      "Style consistency",
      "Output delivery",
      "Iteration & scaling",
    ],
  },
];

function Placeholder({
  label,
  aspect = "16/9",
  icon,
}: {
  label: string;
  aspect?: string;
  icon?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-md flex items-center justify-center"
      style={{
        aspectRatio: aspect,
        background:
          "linear-gradient(135deg, var(--placeholder-gradient-from) 0%, var(--placeholder-gradient-to) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${label.replace(/\s/g, "-")}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${label.replace(/\s/g, "-")})`}
        />
      </svg>
      <span className="relative z-10 text-2xl">{icon}</span>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="border rounded px-3 py-2"
            style={{
              borderColor: "var(--flow-step-border)",
              backgroundColor: "var(--flow-step-bg)",
            }}
          >
            <span
              className="font-mono text-[10px] tracking-[1px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              className="text-[10px]"
              style={{ color: "var(--flow-connector)" }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function CollapsedCard({
  cs,
  onClick,
}: {
  cs: CaseStudy;
  onClick: () => void;
}) {
  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer flex flex-col"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
      }}
      onClick={onClick}
    >
      <div className="shrink-0" style={{ aspectRatio: "16/9" }}>
        <Placeholder label={cs.title} icon={cs.icon} aspect="16/9" />
      </div>
      <div className="p-5 flex items-start justify-between gap-4 flex-1">
        <div className="min-w-0 overflow-hidden">
          <p
            className="font-mono text-[9px] uppercase tracking-[3px] mb-2"
            style={{ color: "var(--gold)" }}
          >
            {cs.label}
          </p>
          <h3
            className="font-serif text-[22px] sm:text-[26px] font-light mb-1 truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {cs.title}
          </h3>
          <p
            className="font-sans text-[13px] font-light line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {cs.tagline}
          </p>
        </div>
        <span
          className="shrink-0 w-8 h-8 flex items-center justify-center text-xl"
          style={{ color: "var(--text-dim)" }}
        >
          +
        </span>
      </div>
    </div>
  );
}

function ExpandedCard({
  cs,
  onClose,
}: {
  cs: CaseStudy;
  onClose: () => void;
}) {
  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{
        borderColor: "var(--border-expanded)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div className="p-6 md:p-8">
        {/* Header with close */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-1"
              style={{ color: "var(--gold)" }}
            >
              {cs.label}
            </p>
            <h3
              className="font-serif text-[28px] font-light"
              style={{ color: "var(--text-primary)" }}
            >
              {cs.title}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="shrink-0 w-9 h-9 flex items-center justify-center text-xl border rounded-full"
            style={{
              color: "var(--text-dim)",
              borderColor: "var(--gold-border)",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Visual */}
        <div className="mb-8">
          <Placeholder
            label={`${cs.title}-exp`}
            aspect="21/9"
            icon={cs.icon}
          />
        </div>

        {/* System Flow */}
        <div className="mb-8">
          <p
            className="font-mono text-[9px] uppercase tracking-[3px] mb-4"
            style={{ color: "var(--gold)" }}
          >
            SYSTEM FLOW
          </p>
          <FlowDiagram steps={cs.flowSteps} />
        </div>

        {/* Problem / Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
              style={{ color: "var(--gold)" }}
            >
              PROBLEM
            </p>
            <p
              className="font-sans text-[14px] font-light leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {cs.problem}
            </p>
          </div>
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
              style={{ color: "var(--gold)" }}
            >
              INSIGHT
            </p>
            <p
              className="font-sans text-[14px] font-light leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {cs.insight}
            </p>
          </div>
        </div>

        {/* What I Did */}
        <div className="mb-8">
          <p
            className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
            style={{ color: "var(--gold)" }}
          >
            WHAT I DID
          </p>
          <p
            className="font-sans text-[14px] font-light leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {cs.whatIDid}
          </p>
        </div>

        {/* Why / Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
              style={{ color: "var(--gold)" }}
            >
              WHY IT WORKED
            </p>
            <p
              className="font-sans text-[14px] font-light leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {cs.whyItWorked}
            </p>
          </div>
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
              style={{ color: "var(--gold)" }}
            >
              OUTCOME
            </p>
            <p
              className="font-sans text-[14px] font-light leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {cs.outcome}
            </p>
          </div>
        </div>

        {/* Stats */}
        {cs.stats && (
          <div className="flex flex-wrap gap-8 mb-8">
            {cs.stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-[28px] font-light"
                  style={{ color: "var(--stats-color)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-mono text-[9px] uppercase tracking-[2px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Process */}
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-mono text-[10px] tracking-[1px]"
            style={{ color: "var(--text-dim)" }}
          >
            {cs.process}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback((idx: number) => {
    setOpenIndex((prev) => {
      if (prev === idx) return null;
      return idx;
    });
  }, []);

  // Scroll to expanded card after render
  const scrollToExpanded = useCallback(() => {
    requestAnimationFrame(() => {
      if (expandedRef.current) {
        const top =
          expandedRef.current.getBoundingClientRect().top +
          window.scrollY -
          100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  }, []);

  const handleCardClick = useCallback(
    (idx: number) => {
      handleOpen(idx);
      // Use a short timeout to let state update and DOM render
      setTimeout(scrollToExpanded, 50);
    },
    [handleOpen, scrollToExpanded]
  );

  const remainingCards =
    openIndex !== null
      ? caseStudies
          .map((cs, i) => ({ cs, i }))
          .filter(({ i }) => i !== openIndex)
      : [];

  return (
    <section id="systems" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">AI PRODUCT SYSTEMS</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[38px] font-light mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Selected Systems
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p
            className="font-sans text-[13px] italic font-light leading-relaxed mb-10"
            style={{ color: "var(--text-dim)" }}
          >
            Not all of these are finished products. Some are systems,
            experiments, or early-stage applications — but all reflect how I
            think and build.
          </p>
        </FadeIn>

        {openIndex === null ? (
          /* Default 2×2 grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <FadeIn key={i} delay={0.24 + i * 0.08}>
                <CollapsedCard cs={cs} onClick={() => handleCardClick(i)} />
              </FadeIn>
            ))}
          </div>
        ) : (
          /* Expanded state: full-width card + 3 remaining below */
          <div className="flex flex-col gap-6">
            <div ref={expandedRef}>
              <ExpandedCard
                cs={caseStudies[openIndex]}
                onClose={() => setOpenIndex(null)}
              />
            </div>

            {/* Remaining 3 cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {remainingCards.map(({ cs, i }) => (
                <CollapsedCard
                  key={i}
                  cs={cs}
                  onClick={() => handleCardClick(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
