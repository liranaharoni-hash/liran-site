"use client";

import FadeIn from "./FadeIn";

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

        <FadeIn delay={0.16}>
          <div
            className="relative rounded-[14px] overflow-hidden border"
            style={{
              aspectRatio: "21/9",
              backgroundColor: "var(--showreel-bg)",
              borderColor: "var(--border)",
            }}
          >
            {/* Top gradient bar */}
            <div
              className="absolute top-0 left-0 right-0 h-12 z-10"
              style={{
                background: `linear-gradient(to bottom, var(--showreel-bg), transparent)`,
              }}
            />
            {/* Bottom gradient bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-12 z-10"
              style={{
                background: `linear-gradient(to top, var(--showreel-bg), transparent)`,
              }}
            />

            {/* Play button */}
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
                  <path d="M0 0L18 10L0 20V0Z" fill="var(--gold)" fillOpacity="0.5" />
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

        <FadeIn delay={0.24}>
          <p
            className="font-sans text-[13px] italic font-light leading-relaxed mt-6 text-center"
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
