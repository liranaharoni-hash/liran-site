"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Fade-in on scroll ─── */

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add("pipeline-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className="pipeline-step"
      style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
    >
      {children}
    </div>
  );
}

/* ─── Divider line ─── */

function Divider() {
  return (
    <div className="mx-auto my-12" style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />
  );
}

/* ─── Video block ─── */

function VideoBlock({ src, label, aspect, poster, objectFit }: { src: string; label: string; aspect?: string; poster?: string; objectFit?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Play/pause on scroll visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden border"
      style={{ aspectRatio: aspect, borderColor: "var(--border)", backgroundColor: "#000" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full h-full block"
        style={{ objectFit: (objectFit as React.CSSProperties["objectFit"]) || "contain" }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Label */}
      <div
        className="absolute top-3 start-3 font-mono text-[9px] tracking-[2px] uppercase px-3 py-1.5 rounded pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "var(--gold)" }}
      >
        {label}
      </div>
      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 end-3 z-20 flex items-center justify-center rounded-full backdrop-blur-sm transition-opacity duration-300"
        style={{ width: 36, height: 36, backgroundColor: "rgba(0,0,0,0.4)", opacity: hovered ? 1 : 0 }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ─── Stat card ─── */

function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div
      className="rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <p className="font-mono font-bold leading-none mb-2" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "var(--gold)" }}>
        {num}
      </p>
      <p className="font-sans text-[12px] font-light tracking-[0.5px]" style={{ color: "var(--text-dim)" }}>
        {label}
      </p>
    </div>
  );
}

/* ─── AI tag pill ─── */

function AiTag({ children }: { children: string }) {
  return (
    <span
      className="inline-block font-mono text-[11px] px-3 py-1 rounded mr-1.5 mb-1.5"
      style={{ backgroundColor: "var(--gold-subtle, rgba(201,169,110,0.12))", color: "var(--gold)" }}
    >
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */

export default function EnsoCaseStudy({ heroQuote, whatThisProves, whatThisProvesLabel }: { heroQuote?: string; whatThisProves?: readonly string[]; whatThisProvesLabel?: string }) {
  return (
    <div className="mt-2">
      {/* ══════ HERO QUOTE ══════ */}
      {heroQuote && (
        <Fade>
          <p className="font-serif text-[22px] md:text-[26px] italic font-light leading-relaxed text-center mb-10" style={{ color: "var(--text-primary)" }}>
            &ldquo;{heroQuote}&rdquo;
          </p>
        </Fade>
      )}

      {/* ══════ HERO ══════ */}
      <Fade>
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[4px] uppercase mb-6" style={{ color: "var(--gold)" }}>
            Leaders × SodaStream — AI-Driven Campaign
          </p>
          <h3 className="font-serif font-light leading-none mb-5" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--text-primary)" }}>
            ensō <em className="font-light" style={{ color: "var(--gold)" }}>Gallery</em>
          </h3>
          <p className="font-sans text-[15px] font-light leading-relaxed max-w-[520px] mx-auto mb-6" style={{ color: "var(--text-dim)" }}>
            Turning a premium product launch into an AI-powered cultural experience — blending art, technology, and community engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              ["Client", "SodaStream"],
              ["Product", "ensō Premium"],
              ["Date", "Oct 2025"],
              ["Role", "Creative & AI Direction"],
            ].map(([k, v]) => (
              <span key={k} className="font-mono text-[11px] tracking-[1px] uppercase" style={{ color: "var(--text-dim)" }}>
                {k}: <strong className="font-medium" style={{ color: "var(--text-primary)" }}>{v}</strong>
              </span>
            ))}
          </div>
        </div>
      </Fade>

      {/* ══════ MUSEUM HERO IMAGE ══════ */}
      <Fade delay={0.1}>
        <div className="max-w-[800px] mx-auto mb-2">
          <img
            src="/images/enso/museum-hero.jpg"
            alt="ensō displayed as art in a museum gallery"
            className="w-full rounded-xl block"
            loading="lazy"
          />
          <p className="text-center mt-4 font-sans text-[13px] italic font-light" style={{ color: "var(--text-dim)" }}>
            AI-generated visual concept — the ensō positioned as a museum masterpiece among contemporary art
          </p>
        </div>
      </Fade>

      {/* ══════ CINEMATIC VIDEO ══════ */}
      <Fade delay={0.15}>
        <div className="max-w-[900px] mx-auto mt-8">
          <VideoBlock src="/videos/4vids.mp4" label="AI-Generated Worlds" aspect="21/9" objectFit="cover" />
        </div>
      </Fade>

      <Divider />

      {/* ══════ CONCEPT ══════ */}
      <Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-4" style={{ color: "var(--gold)" }}>
              The Creative Concept
            </p>
            <h4 className="font-serif text-[24px] font-light leading-snug mb-5" style={{ color: "var(--text-primary)" }}>
              A product so beautiful,<br />it belongs in a <strong className="font-medium" style={{ color: "var(--gold)" }}>museum</strong>
            </h4>
            <p className="font-sans text-[14px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
              The ensō isn&apos;t just a sparkling water maker — it&apos;s a design object. Instead of a standard product launch campaign, we created an entire AI-generated visual world that positioned the ensō as a gallery-worthy piece of art.
            </p>
            <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
              We built an interactive digital gallery experience — a landing page where users explored AI-generated rooms, each placing the ensō in a different artistic context. The concept invited the public to participate in a national creative contest, generating their own AI art featuring the product.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
              <p className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: "var(--gold)" }}>AI Tools & Process</p>
              <p className="font-sans text-[13px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
                Every visual asset in this campaign was generated using AI — from the museum environments to the product placements, the gallery compositions to the atmospheric lighting.
              </p>
              <div>
                <AiTag>Midjourney</AiTag>
                <AiTag>Image Compositing</AiTag>
                <AiTag>Prompt Engineering</AiTag>
                <AiTag>Style Transfer</AiTag>
                <AiTag>AI Video</AiTag>
                <AiTag>Interactive UX</AiTag>
                <AiTag>Landing Page Design</AiTag>
                <AiTag>UGC Strategy</AiTag>
              </div>
            </div>
            <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
              <p className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: "var(--gold)" }}>Campaign Ecosystem</p>
              <p className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
                Interactive landing page experience · National AI art contest · Influencer-driven UGC layer · Paid media across Meta & YouTube · Organic social content library · Performance optimization loop
              </p>
            </div>
          </div>
        </div>
      </Fade>

      <Divider />

      {/* ══════ HERO VIDEO + CREATOR TRIO ══════ */}
      <Fade>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[3px] text-center mb-4" style={{ color: "var(--gold)" }}>
            The Campaign Film
          </p>
          <h4 className="font-serif text-[22px] font-light text-center mb-6" style={{ color: "var(--text-primary)" }}>
            An AI-crafted invitation to create, explore, and reimagine
          </h4>
          <VideoBlock src="/videos/enso_hero_video.mp4" label="Campaign Hero Film" poster="/images/enso/hero-poster.jpg" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <VideoBlock src="/videos/creator1.mp4" label="Creator 01" aspect="3/4" objectFit="cover" />
            <VideoBlock src="/videos/creator2.mp4" label="Creator 02" aspect="3/4" objectFit="cover" />
            <VideoBlock src="/videos/creator3.mp4" label="Creator 03" aspect="3/4" objectFit="cover" />
          </div>
        </div>
      </Fade>

      <Divider />

      {/* ══════ 5 LAYERS ══════ */}
      <Fade>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            How We Built It
          </p>
          <h4 className="font-serif text-[24px] font-light mb-10" style={{ color: "var(--text-primary)" }}>
            Five layers of AI-driven <span style={{ color: "var(--gold)" }}>creative strategy</span>
          </h4>

          {[
            {
              num: "01",
              title: "AI Visual World-Building",
              desc: "Created a complete gallery universe using AI image generation. Each \"room\" was a different artistic genre — from classical museum halls to futuristic installations — with the ensō as the centerpiece. Developed a consistent visual language across 30+ generated environments.",
            },
            {
              num: "02",
              title: "Interactive Landing Page",
              desc: "Built an immersive scrolling gallery experience that invited users to explore, interact, and ultimately join a creation contest. The page generated 32,837 unique brand impressions with 43,412 content interactions — and peaked at 6,000 daily visitors with 97% relevant audience targeting.",
            },
            {
              num: "03",
              title: "UGC Creator Ecosystem",
              desc: "Recruited 7 UGC creators and 5 key influencers (790K combined followers) to produce branded gallery-style content. The UGC served a dual role: paid promotion driving quality traffic, and organic posting creating an additional exposure layer.",
            },
            {
              num: "04",
              title: "Precision Media Buying",
              desc: "Budget was allocated based on actual performance, not channel diversity. Meta and YouTube drove the core traffic, with Website Custom Conversion campaigns delivering high-quality leads at low CPL. The decision to skip Brand Audience campaigns proved right — traffic was precise, quality, with zero waste.",
            },
            {
              num: "05",
              title: "Client Pitch & Project Sell",
              desc: "Sold the concept to SodaStream as a digital-first premium experience that positions the ensō beyond traditional advertising — into the territory of art and culture. The entire project was managed end-to-end: concept, AI production, development, influencer recruitment, media planning, and real-time optimization.",
            },
          ].map((layer) => (
            <div key={layer.num} className="grid gap-5 mb-8" style={{ gridTemplateColumns: "48px 1fr" }}>
              <p className="font-mono text-[28px] font-bold leading-none pt-1" style={{ color: "var(--gold)" }}>
                {layer.num}
              </p>
              <div>
                <h5 className="font-sans text-[16px] font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                  {layer.title}
                </h5>
                <p className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {layer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Fade>

      {/* ══════ LANDING PAGE VIDEO ══════ */}
      <Fade>
        <div className="mt-4">
          <p className="font-mono text-[9px] uppercase tracking-[3px] text-center mb-4" style={{ color: "var(--gold)" }}>
            The Interactive Experience
          </p>
          <h4 className="font-serif text-[22px] font-light text-center mb-6" style={{ color: "var(--text-primary)" }}>
            A scrolling gallery where every room is a new AI-generated world
          </h4>
          <VideoBlock src="/videos/enso_landing_scroll.mp4" label="Landing Page Scroll-Through" />
        </div>
      </Fade>

      <Divider />

      {/* ══════ CAMPAIGN RESULTS ══════ */}
      <Fade>
        <div className="text-center">
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            Campaign Results
          </p>
          <h4 className="font-serif text-[24px] font-light mb-10" style={{ color: "var(--text-primary)" }}>
            Numbers that <span style={{ color: "var(--gold)" }}>proved the concept</span>
          </h4>

          {/* Row 1: 4 stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard num="2.5M" label="Total Views" />
            <StatCard num="18.6%" label="Engagement Rate" />
            <StatCard num="6,000" label="Peak Daily Visitors" />
            <StatCard num="97%" label="Relevant Audience" />
          </div>

          {/* Row 2: 3 stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard num="43,412" label="Content Interactions" />
            <StatCard num="32,837" label="Unique Impressions" />
            <StatCard num="934" label="Link Clicks" />
          </div>

          {/* Highlight card */}
          <div
            className="rounded-xl p-8 text-center max-w-[500px] mx-auto mb-8"
            style={{ background: "linear-gradient(135deg, var(--gold), #a8873d)" }}
          >
            <p className="font-mono text-[clamp(32px,5vw,52px)] font-bold leading-none" style={{ color: "var(--bg)" }}>
              $120,600
            </p>
            <p className="font-sans text-[13px] font-medium mt-2" style={{ color: "var(--bg)", opacity: 0.8 }}>
              Earned Media Value
            </p>
          </div>
        </div>
      </Fade>

      {/* ══════ MEDIA PERFORMANCE ══════ */}
      <Fade>
        <div
          className="rounded-2xl border p-8 md:p-12 text-center mb-4"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
        >
          <p className="font-mono text-[11px] tracking-[3px] uppercase mb-2" style={{ color: "var(--gold)" }}>
            Media Performance vs. Benchmarks
          </p>
          <p className="font-sans text-[13px] font-light mb-8" style={{ color: "var(--text-dim)" }}>
            Campaign delivery exceeded targets across all key metrics
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              ["345%", "CTR vs. Target"],
              ["274%", "Clicks vs. Target"],
              ["250%", "Views vs. Target"],
              ["159%", "Leads vs. Target"],
              ["314", "Total Leads"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="font-mono text-[32px] font-bold leading-none" style={{ color: "var(--gold)" }}>
                  {val}
                </p>
                <p className="font-sans text-[11px] mt-1" style={{ color: "var(--text-dim)" }}>
                  {lbl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Fade>

      <Divider />

      {/* ══════ KEY TAKEAWAYS ══════ */}
      <Fade>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            Key Takeaways
          </p>
          <h4 className="font-serif text-[24px] font-light mb-8" style={{ color: "var(--text-primary)" }}>
            What made this <span style={{ color: "var(--gold)" }}>work</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                title: "Extreme Engagement",
                desc: "Users didn't just visit — they interacted deeply. The gamified gallery experience generated \"bypass attempts\" and bugs from sheer traffic volume. Real engagement, not vanity metrics.",
              },
              {
                num: "02",
                title: "Rapid Response",
                desc: "Real-time troubleshooting and full recovery of every technical issue. Maintaining a stable, premium user experience despite unexpected traffic spikes.",
              },
              {
                num: "03",
                title: "Precision Management",
                desc: "Clear timelines and accurate project management throughout the entire campaign lifecycle — from concept pitch to post-campaign reporting.",
              },
              {
                num: "04",
                title: "Strong Long Tail",
                desc: "Organic traffic continued flowing long after paid media ended. The experience had inherent shareability — 600 daily visitors sustained organically in the long tail phase.",
              },
            ].map((tk) => (
              <div
                key={tk.num}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
              >
                <p className="font-mono text-[24px] font-bold mb-3" style={{ color: "var(--gold)" }}>
                  {tk.num}
                </p>
                <h5 className="font-sans text-[15px] font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                  {tk.title}
                </h5>
                <p className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {tk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Fade>

      {/* ══════ WHAT THIS PROVES ══════ */}
      {whatThisProves && whatThisProves.length > 0 && (
        <Fade>
          <div className="mt-10">
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
              {whatThisProvesLabel || "What This Proves"}
            </p>
            <div className="ps-4 flex flex-col gap-2" style={{ borderInlineStart: "2px solid var(--gold-border)" }}>
              {whatThisProves.map((item, j) => (
                <p key={j} className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</p>
              ))}
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}
