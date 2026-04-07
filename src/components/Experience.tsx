"use client";

import FadeIn from "./FadeIn";

const roles = [
  {
    title: "VP Creative & Strategy",
    company: "LEADERS",
    period: "2019 – Present",
    description:
      "Creative, content, and strategy operations across brand, influencer, social, and campaign systems. Built teams, shaped strategic projects, applied AI tools as strategic layers.",
  },
  {
    title: "Creative Director",
    company: "Rainer Communications",
    period: "2015 – 2019",
    description:
      "Content, marketing, and production for B2B and B2C clients across digital platforms — from concept through execution.",
  },
  {
    title: "Production & Content",
    company: "Earlier Background",
    period: "2010 – 2015",
    description:
      "Studio direction, reporting, content creation, editing, field work, and early digital brand production.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">BACKGROUND</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[36px] font-light mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Experience
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p
            className="font-sans text-[14px] font-light leading-relaxed mb-10"
            style={{ color: "var(--text-dim)" }}
          >
            From creative strategy and content systems to product thinking, AI
            workflows, and how things are actually used.
          </p>
        </FadeIn>

        <div className="space-y-0">
          {roles.map((role, i) => (
            <FadeIn key={i} delay={0.24 + i * 0.08}>
              <div
                className="py-8"
                style={
                  i < roles.length - 1
                    ? { borderBottom: "1px solid var(--border)" }
                    : undefined
                }
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3
                      className="font-serif text-[20px] font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {role.title}
                    </h3>
                    <p
                      className="font-mono text-[11px] uppercase tracking-[2px] mt-1"
                      style={{ color: "var(--gold)" }}
                    >
                      {role.company}
                    </p>
                  </div>
                  <p
                    className="font-mono text-[10px] tracking-[2px] mt-1 sm:mt-2 shrink-0"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {role.period}
                  </p>
                </div>
                <p
                  className="font-sans text-[14px] font-light leading-relaxed"
                  style={{ color: "var(--text-dim)" }}
                >
                  {role.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
