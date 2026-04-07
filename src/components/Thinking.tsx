"use client";

import FadeIn from "./FadeIn";

export default function Thinking() {
  return (
    <section id="thinking" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="max-w-[560px]">
          <FadeIn>
            <p className="label mb-10">HOW I THINK</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p
              className="font-serif text-[24px] font-light leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              I don&apos;t approach projects as isolated campaigns.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="font-serif text-[24px] font-normal leading-relaxed mt-2"
              style={{ color: "var(--gold)" }}
            >
              I approach them as systems.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p
              className="font-sans text-[16px] font-light leading-relaxed mt-7"
              style={{ color: "var(--text-dim)" }}
            >
              Systems of behavior, attention, and interaction.
            </p>
          </FadeIn>

          <FadeIn delay={0.32}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mt-4"
              style={{ color: "var(--text-muted)" }}
            >
              Where most work focuses on visibility, I focus on what happens
              after — how something is understood, used, and repeated.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mt-4"
              style={{ color: "var(--text-dim)" }}
            >
              Over time, this naturally extended into product thinking, and into
              AI as a behavioral layer — not just a tool.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
