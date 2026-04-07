"use client";

import FadeIn from "./FadeIn";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Gold glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: "var(--glow-opacity)",
        }}
      />

      <div className="max-w-[960px] mx-auto px-6 flex flex-col md:flex-row items-start gap-12 md:gap-16">
        {/* Left column */}
        <div className="flex-1 relative z-10">
          <FadeIn>
            <p className="label mb-6">LIRAN AHARONI</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              className="font-serif font-light leading-[1.2] mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 50px)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>
                Creative strategy,
              </span>
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                evolved into systems,
              </span>
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                product thinking,
              </span>
              <br />
              <span style={{ color: "var(--gold)" }}>
                and AI-driven workflows
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Applying creative thinking to user behavior, adoption, and
              real-world product usage.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p
              className="font-sans text-[13px] font-light leading-relaxed mb-8"
              style={{ color: "var(--text-dim)" }}
            >
              Senior creative and strategy leader with 15+ years across content,
              campaigns, production, and digital systems. Over time, the work
              expanded into AI-enabled workflows, behavioral thinking, and
              system design shaped by real-world use.
            </p>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href="#systems"
                className="inline-block px-5 py-2.5 text-[13px] font-sans font-normal rounded-[5px] hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--cta-primary-bg)",
                  color: "var(--cta-primary-text)",
                }}
              >
                View Systems
              </a>
              <a
                href="#creative"
                className="inline-block px-5 py-2.5 border text-[13px] font-sans font-light rounded-[5px] transition-colors"
                style={{
                  borderColor: "var(--cta-secondary-border)",
                  color: "var(--cta-secondary-text)",
                }}
              >
                Creative Work
              </a>
              <a
                href="#contact"
                className="inline-block px-5 py-2.5 text-[13px] font-sans font-light transition-colors hover:!text-[var(--gold)]"
                style={{ color: "var(--text-dim)" }}
              >
                Contact
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.36}>
            <p
              className="font-mono text-[10px] tracking-[2px] mb-5"
              style={{ color: "var(--text-faint)" }}
            >
              Not a classic product manager. Not just a creative director.
              <br className="hidden sm:block" />A hybrid operator working
              between both.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <button
              onClick={onOpenModal}
              className="font-mono text-[10px] uppercase tracking-[3px] transition-colors hover:!text-[var(--gold)]"
              style={{ color: "var(--text-faint)" }}
            >
              How this site was built →
            </button>
          </FadeIn>
        </div>

        {/* Right column — photo placeholder */}
        <FadeIn delay={0.24} className="shrink-0">
          <div
            className="w-[260px] h-[340px] rounded-lg relative overflow-hidden flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--placeholder-gradient-from) 0%, var(--placeholder-gradient-to) 100%)",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="heroGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
            <span
              className="font-mono text-[10px] uppercase tracking-[3px] relative z-10"
              style={{ color: "var(--text-dim)" }}
            >
              YOUR PHOTO
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
