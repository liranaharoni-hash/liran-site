"use client";

import FadeIn from "./FadeIn";

const roles = [
  {
    title: "VP Creative & Strategy",
    company: "LEADERS (LDRSgroup / Stagwell)",
    period: "2019 – Present",
    description:
      "Leading creative, content, and strategy operations at a digital 360° agency serving major local and global brands. The role spans brand strategy, influencer campaigns, social systems, and cross-functional project leadership.",
    highlights: [
      "Led end-to-end creative and campaign strategy for brands including SodaStream, Sony PlayStation, Estée Lauder, Flormar, and others",
      "Built and managed creative teams across content, design, video, and social",
      "Worked directly with C-level stakeholders on growth strategy and brand differentiation",
      "Introduced AI tools and workflows as strategic production layers inside influencer and campaign operations",
      "Operated the IMAI influencer platform as a strategic intelligence layer for campaign planning",
      "Shaped the agency's AI adoption approach — from creative generation to workflow integration",
    ],
  },
  {
    title: "Creative Director",
    company: "Rainer Communications",
    period: "2015 – 2019",
    description:
      "Led creative and content strategy for B2B and B2C clients across digital platforms — from concept development through production and delivery.",
    highlights: [
      "Directed campaigns across digital, social, and branded content for technology and consumer brands",
      "Managed cross-platform content production — video, editorial, social, web",
      "Led client relationships and strategic presentations",
      "Built creative processes and team workflows from concept to execution",
    ],
  },
  {
    title: "Production, Journalism & Content",
    company: "Various",
    period: "2010 – 2015",
    description:
      "Hands-on production, reporting, and content creation across studio, field, and digital environments.",
    highlights: [
      "Studio direction and live production",
      "Field reporting and editorial content (including work with AP News)",
      "Video editing, post-production, and digital content creation",
      "Early-stage digital brand production and content systems",
    ],
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
            style={{ color: "var(--text-secondary)" }}
          >
            I come from years of building creative strategy, content systems,
            and campaigns across brands and platforms. Over time, the work
            pushed deeper — from ideas into systems, from campaigns into
            behavior, and from content into how things are actually used.
            Instead of switching fields, I expanded the way I work —
            integrating product thinking, AI tools, and workflow design into
            the same creative foundation.
          </p>
        </FadeIn>

        <div className="space-y-0">
          {roles.map((role, i) => (
            <FadeIn key={i} delay={0.24 + i * 0.1}>
              <div
                className="py-10"
                style={
                  i < roles.length - 1
                    ? {
                        borderBottom: "1px solid var(--gold-border)",
                      }
                    : undefined
                }
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <h3
                      className="font-serif text-[22px] font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {role.title}
                    </h3>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[2px] mt-1"
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
                  className="font-sans text-[14px] font-light leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {role.description}
                </p>

                <div
                  className="pl-4 flex flex-col gap-2"
                  style={{ borderLeft: "2px solid var(--gold-border)" }}
                >
                  {role.highlights.map((item, j) => (
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
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.56}>
          <div className="mt-10 text-center">
            <a
              href="#"
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              Download Full CV →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
