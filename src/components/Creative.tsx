"use client";

import FadeIn from "./FadeIn";

type WorkItem = {
  title: string;
  context: string;
  description: string;
  type: "video" | "visual";
};

const works: WorkItem[] = [
  {
    title: "SodaStream — Spirit of Water",
    context: "LEADERS · Campaign Film",
    description:
      "Hero campaign film for SodaStream product launch — directing, concept, and production.",
    type: "video",
  },
  {
    title: "Sony PlayStation — Community Campaign",
    context: "LEADERS · Social & Content",
    description:
      "Multi-platform content strategy and production for PlayStation Israel community.",
    type: "video",
  },
  {
    title: "Estée Lauder — Influencer Production",
    context: "LEADERS · Influencer Content",
    description:
      "High-end influencer content production and creative direction for beauty campaigns.",
    type: "visual",
  },
  {
    title: "Brand Showreels & Compilations",
    context: "Various · Direction & Editing",
    description:
      "Selected compilation of campaign work, brand films, and production highlights.",
    type: "video",
  },
  {
    title: "AI-Generated Fashion Visuals",
    context: "Studio48 · AI Production",
    description:
      "AI-generated fashion and product imagery created as part of the Studio48 production system.",
    type: "visual",
  },
  {
    title: "Content Systems & Social",
    context: "Various · Content Strategy",
    description:
      "Social content frameworks, editorial systems, and platform-native content production.",
    type: "visual",
  },
];

function PlayIcon() {
  return (
    <div
      className="w-11 h-11 rounded-full border flex items-center justify-center"
      style={{ borderColor: "var(--gold-border)" }}
    >
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        className="ml-0.5"
      >
        <path d="M0 0L14 8L0 16V0Z" fill="var(--gold)" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div
      className="rounded-[12px] border overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Visual placeholder */}
      <div
        className="relative flex items-center justify-center"
        style={{
          aspectRatio: "16/10",
          background: `linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to))`,
          backgroundImage: `
            linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to)),
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      >
        {item.type === "video" && <PlayIcon />}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4
          className="font-serif text-[18px] font-light mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {item.title}
        </h4>
        <p
          className="font-mono text-[10px] uppercase tracking-[2px] mb-2"
          style={{ color: "var(--gold)" }}
        >
          {item.context}
        </p>
        <p
          className="font-sans text-[13px] font-light leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Creative() {
  return (
    <section id="creative" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">CREATIVE WORK</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[36px] font-light mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            Selected campaigns and productions
          </h2>
        </FadeIn>

        {/* Showreel */}
        <FadeIn delay={0.16}>
          <div
            className="relative rounded-[14px] overflow-hidden border"
            style={{
              aspectRatio: "21/9",
              backgroundColor: "var(--showreel-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-12 z-10"
              style={{
                background:
                  "linear-gradient(to bottom, var(--showreel-bg), transparent)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-12 z-10"
              style={{
                background:
                  "linear-gradient(to top, var(--showreel-bg), transparent)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
              <div
                className="w-14 h-14 rounded-full border flex items-center justify-center"
                style={{ borderColor: "var(--gold-border)" }}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M0 0L18 10L0 20V0Z"
                    fill="var(--gold)"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
              <span
                className="font-mono text-[9px] uppercase tracking-[3px]"
                style={{ color: "var(--text-dim)" }}
              >
                SHOWREEL
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Grid title */}
        <FadeIn delay={0.24}>
          <h3
            className="font-serif text-[24px] font-light mt-16 mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            Selected Productions & Campaigns
          </h3>
        </FadeIn>

        {/* Work grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {works.map((item, i) => (
            <FadeIn key={i} delay={0.3 + i * 0.06}>
              <WorkCard item={item} />
            </FadeIn>
          ))}
        </div>

        {/* Closing line */}
        <FadeIn delay={0.7}>
          <p
            className="font-sans text-[13px] italic font-light leading-relaxed mt-12 text-center"
            style={{ color: "var(--text-dim)" }}
          >
            Creative execution built the foundation.
            <br />
            System thinking reshaped how I approach it today.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
