"use client";

import { useState, useRef, useCallback } from "react";
import FadeIn from "./FadeIn";

interface CaseStudy {
  icon: string;
  cardLabel: string;
  cardTitle: string;
  cardDescriptor: string;
  heroLine: string;
  problem: string;
  insight: string;
  systemDesign: string;
  shiftBefore: string;
  shiftAfter: string;
  outcome: string;
  whatThisProves: string[];
  process: string;
  flowSteps: string[];
  stats?: { label: string; value: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    icon: "🤖",
    cardLabel: "BEHAVIOR LAYER",
    cardTitle: "Bestie.ai",
    cardDescriptor:
      "Scaling creator interaction through AI-driven conversation systems",
    heroLine:
      "Scaling creators is not a content problem. It is a behavior problem.",
    problem:
      "Creators scale faster than their ability to maintain personal interaction. As audiences grow, DMs, comments, repeated questions, and product inquiries create a bottleneck that weakens community connection and leaves monetization opportunities unanswered.",
    insight:
      "The real value of creator relationships does not happen in posts. It happens in conversations.",
    systemDesign:
      "Bestie.ai was designed as a conversational extension layer around the creator — trained on the creator's tone, content, preferences, and boundaries. Built to live inside high-intent interaction points such as DMs and direct questions. Capable of surfacing relevant products, content, and responses in context. Supports coupon flows, support routing, and insight extraction from audience conversations. Framed as an extension of the creator's presence, not a generic chatbot.",
    shiftBefore: "Audiences consume content passively",
    shiftAfter:
      "Audiences interact, ask, discover, and convert through conversation",
    outcome:
      "Validated in advanced pilots with creators and brands. Proved strong relevance around scalability, monetization, and response workflows. Demonstrated the product value of extending creator presence rather than automating content.",
    whatThisProves: [
      "Ability to translate content problems into systems",
      "Understanding of creator behavior at scale",
      "Product thinking applied to real interaction patterns",
    ],
    process:
      "AI-assisted structuring, system logic, interaction design, and behavior-layer thinking",
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
    cardLabel: "POSITIONING SYSTEM",
    cardTitle: "CV Repositioning System",
    cardDescriptor:
      "Restructuring how candidates are perceived through role-specific hiring logic",
    heroLine:
      "Most hiring failures are not experience failures. They are positioning failures.",
    problem:
      "Many candidates are filtered out not because they lack relevant experience, but because they present it in a way that hiring managers and screening systems do not interpret correctly.",
    insight:
      "The same experience can look generic, weak, or highly relevant — depending on hierarchy, emphasis, framing, and structure.",
    systemDesign:
      "Built a system that analyzes an existing CV against a target role and restructures the candidate's experience around actual hiring signals: relevance to the role, clarity of structure, hierarchy of information, business framing, keyword logic, and role-fit emphasis. The system does not invent or exaggerate. It reorganizes what is already true so the person is perceived more accurately.",
    shiftBefore: "Candidate is scanned as broad or unfocused",
    shiftAfter:
      "Candidate is understood as relevant, intentional, and role-aligned",
    outcome:
      "Tested across multiple role types and industries. Created stronger alignment between candidate background and role requirements. Shifted evaluation from 'generic profile' to 'clear fit.'",
    whatThisProves: [
      "Ability to turn ambiguity into structure",
      "Understanding of screening logic and decision behavior",
      "Product thinking applied to a real-world perception problem",
    ],
    process:
      "Hiring-logic mapping, restructuring systems, and AI-assisted iteration",
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
    cardLabel: "PARTICIPATORY EXPERIENCE",
    cardTitle: "SodaStream AI Experience",
    cardDescriptor:
      "Turning a campaign into a product-like interaction layer",
    heroLine:
      "A campaign becomes more powerful when people don't just watch it — they enter it.",
    problem:
      "A premium product launch needed strong engagement and excitement, but without relying on a heavy traditional production model.",
    insight:
      "Instead of asking users to consume a campaign, invite them to participate in it.",
    systemDesign:
      "Created an AI-based branded interaction layer that allowed users to generate visual outputs around the launch experience. Controlled branded outputs with direct user interaction. Product presence maintained through structured visual logic. Campaign transformed into an experience rather than a one-way message.",
    shiftBefore: "Passive exposure",
    shiftAfter: "Active interaction and participation",
    outcome: "~90,000 sessions · ~43,000 interactions · ~18.6% engagement",
    whatThisProves: [
      "Ability to convert campaigns into product-like systems",
      "Understanding of interactive behavior",
      "Blending brand, UX, and AI-assisted participation",
    ],
    process:
      "Concept system design, AI-assisted interaction logic, and structured engagement design",
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
    cardLabel: "AI PRODUCTION SYSTEM",
    cardTitle: "Studio48",
    cardDescriptor:
      "Turning visual production into a repeatable AI-enabled workflow",
    heroLine:
      "Brands don't actually need shoots. They need usable visual output.",
    problem:
      "Fashion and product content production is expensive, slow, operationally heavy, and difficult to scale.",
    insight: "The real bottleneck is not creativity. It is production.",
    systemDesign:
      "Built an AI-driven workflow that replaces traditional production with a controlled visual system. Generating consistent visual identities, creating repeatable model/environment combinations, producing campaign-ready outputs without full physical production, enabling faster iteration and lower production cost. Reframed visual execution from a one-time shoot into a repeatable system.",
    shiftBefore:
      "Brands depend on slow, expensive, fixed production cycles",
    shiftAfter:
      "Brands can test, adapt, and scale visual output much faster",
    outcome:
      "Significantly faster visual turnaround. Lower production friction. Validated as a scalable alternative to classic shooting workflows.",
    whatThisProves: [
      "Ability to turn creative execution into a system",
      "Strong AI visual workflow thinking",
      "Connection between aesthetics, production logic, and business utility",
    ],
    process:
      "AI visual workflows, consistency systems, and controlled generation logic",
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
  aspect = "3/2",
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
              style={{ color: "var(--flow-connector, var(--gold-border))" }}
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
      className="border rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
      }}
      onClick={onClick}
    >
      <div className="shrink-0">
        <Placeholder label={cs.cardTitle} icon={cs.icon} aspect="3/2" />
      </div>
      <div className="p-5 flex items-start justify-between gap-4 flex-1">
        <div className="min-w-0 overflow-hidden">
          <p
            className="font-mono text-[9px] uppercase tracking-[3px] mb-2"
            style={{ color: "var(--gold)" }}
          >
            {cs.cardLabel}
          </p>
          <h3
            className="font-serif text-[22px] font-light mb-1 truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {cs.cardTitle}
          </h3>
          <p
            className="font-sans text-[13px] font-light line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {cs.cardDescriptor}
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

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="font-mono text-[9px] uppercase tracking-[3px] mb-3"
      style={{ color: "var(--gold)" }}
    >
      {children}
    </p>
  );
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-sans text-[14px] font-light leading-relaxed"
      style={{ color: "var(--text-secondary)" }}
    >
      {children}
    </p>
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
              {cs.cardLabel}
            </p>
            <h3
              className="font-serif text-[28px] font-light"
              style={{ color: "var(--text-primary)" }}
            >
              {cs.cardTitle}
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

        {/* Hero line */}
        <p
          className="font-serif text-[20px] font-light leading-relaxed mb-8"
          style={{ color: "var(--text-primary)" }}
        >
          {cs.heroLine}
        </p>

        {/* Visual */}
        <div className="mb-8">
          <Placeholder
            label={`${cs.cardTitle}-exp`}
            aspect="21/9"
            icon={cs.icon}
          />
        </div>

        {/* System Flow */}
        <div className="mb-8">
          <SectionLabel>SYSTEM FLOW</SectionLabel>
          <FlowDiagram steps={cs.flowSteps} />
        </div>

        {/* Problem / Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <SectionLabel>PROBLEM</SectionLabel>
            <SectionBody>{cs.problem}</SectionBody>
          </div>
          <div>
            <SectionLabel>INSIGHT</SectionLabel>
            <SectionBody>{cs.insight}</SectionBody>
          </div>
        </div>

        {/* System Design */}
        <div className="mb-8">
          <SectionLabel>SYSTEM DESIGN</SectionLabel>
          <SectionBody>{cs.systemDesign}</SectionBody>
        </div>

        {/* Behavioral Shift */}
        <div className="mb-8">
          <SectionLabel>BEHAVIORAL SHIFT</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="border rounded-md p-4"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-expanded)",
              }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-[2px] mb-2"
                style={{ color: "var(--text-faint)" }}
              >
                BEFORE
              </p>
              <p
                className="font-sans text-[13px] font-light"
                style={{ color: "var(--text-muted)" }}
              >
                {cs.shiftBefore}
              </p>
            </div>
            <div
              className="border rounded-md p-4"
              style={{
                borderColor: "var(--gold-border)",
                backgroundColor: "var(--gold-subtle)",
              }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-[2px] mb-2"
                style={{ color: "var(--gold)" }}
              >
                AFTER
              </p>
              <p
                className="font-sans text-[13px] font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                {cs.shiftAfter}
              </p>
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className="mb-8">
          <SectionLabel>OUTCOME</SectionLabel>
          <SectionBody>{cs.outcome}</SectionBody>
        </div>

        {/* Stats */}
        {cs.stats && (
          <div className="flex flex-wrap gap-8 mb-8">
            {cs.stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-[36px] font-light"
                  style={{ color: "var(--stats-color, var(--gold))" }}
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

        {/* What This Proves */}
        <div className="mb-8">
          <SectionLabel>WHAT THIS PROVES</SectionLabel>
          <div
            className="pl-4 flex flex-col gap-2"
            style={{ borderLeft: "2px solid var(--gold-border)" }}
          >
            {cs.whatThisProves.map((item, j) => (
              <p
                key={j}
                className="font-sans text-[13px] font-light leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

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
      setOpenIndex((prev) => (prev === idx ? null : idx));
      setTimeout(scrollToExpanded, 50);
    },
    [scrollToExpanded]
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <FadeIn key={i} delay={0.24 + i * 0.08}>
                <CollapsedCard cs={cs} onClick={() => handleCardClick(i)} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div ref={expandedRef}>
              <ExpandedCard
                cs={caseStudies[openIndex]}
                onClose={() => setOpenIndex(null)}
              />
            </div>
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
