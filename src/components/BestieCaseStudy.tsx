"use client";

import { useEffect, useRef } from "react";
import { IMG_WELCOME, IMG_CHAT, IMG_COUPONS, IMG_SUPPORT, IMG_DASHBOARD } from "./bestieImages";

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

/* ─── Divider ─── */

function Divider() {
  return (
    <div className="mx-auto my-12" style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />
  );
}

/* ─── Phone frame ─── */

function PhoneFrame({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-[24px] overflow-hidden border w-full"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
      >
        <img src={src} alt={alt} className="w-full block" loading="lazy" />
      </div>
      {label && (
        <p className="mt-3 font-mono text-[10px] tracking-[2px] uppercase text-center" style={{ color: "var(--gold)" }}>
          {label}
        </p>
      )}
    </div>
  );
}

/* ─── Feature card ─── */

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="text-[28px] mb-4">{icon}</div>
      <h5 className="font-sans text-[15px] font-medium mb-2" style={{ color: "var(--text-primary)" }}>
        {title}
      </h5>
      <p className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── Role tag ─── */

function RoleTag({ children }: { children: string }) {
  return (
    <span
      className="inline-block font-mono text-[11px] px-3 py-1.5 rounded-md"
      style={{ backgroundColor: "var(--gold-subtle, rgba(201,169,110,0.12))", color: "var(--gold)" }}
    >
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */

const features = [
  { icon: "\u{1F4AC}", title: "Personality-Matched Conversations", desc: "The agent learns the influencer's tone, vocabulary, and style. Every response feels authentic \u2014 because it's built on their actual content and knowledge base." },
  { icon: "\u{1F4B0}", title: "Monetization Engine", desc: "Embedded coupon codes, product links, and brand collaborations. Every conversation is a potential sale. The agent knows when to recommend, and how to convert \u2014 naturally." },
  { icon: "\u{1F6E1}\uFE0F", title: "Brand-Safe Guardrails", desc: "A triple-layer \u201Csandwich model\u201D \u2014 personality wrapper, content logic, and hard legal boundaries. The agent always reflects the influencer's values with absolute consistency." },
  { icon: "\u{1F4C8}", title: "Audience Intelligence", desc: "Analyzes conversation patterns to surface real community insights \u2014 what followers actually want, ask about, and care about. Turns DM data into content strategy." },
  { icon: "\u{1F91D}", title: "Customer Service Proxy", desc: "When a follower has a product issue, the agent handles it \u2014 collecting details, routing to the right brand, and following up. The influencer never has to touch it." },
  { icon: "\u{1F310}", title: "Beyond Influencers", desc: "Originally built for content creators, bestie.ai is now expanding to serve brands active on social media \u2014 the same technology, applied to any audience-facing entity." },
];

const roleTags = [
  "Product Strategy", "Creative Direction", "AI Prompt Architecture", "UX Design",
  "Roadmap", "Brand Language", "GTM Strategy", "Client Pitch", "Content Strategy",
];

export default function BestieCaseStudy({ heroQuote, whatThisProves, whatThisProvesLabel }: { heroQuote?: string; whatThisProves?: readonly string[]; whatThisProvesLabel?: string }) {
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
            AI Product — Concept to Launch
          </p>
          <h3 className="font-serif font-light leading-none mb-5" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--text-primary)" }}>
            <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>bestie</strong><span style={{ color: "var(--gold)" }}>.ai</span>
          </h3>
          <p className="font-sans text-[15px] font-light leading-relaxed max-w-[560px] mx-auto mb-6" style={{ color: "var(--text-dim)" }}>
            An AI-powered digital twin for influencers — turning unanswered DMs into meaningful conversations, deeper engagement, and a new revenue channel. 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              ["Product", "bestie.ai"],
              ["Category", "AI SaaS"],
              ["Role", "Creator & Product Lead"],
              ["Status", "Live Product"],
            ].map(([k, v]) => (
              <span key={k} className="font-mono text-[11px] tracking-[1px] uppercase" style={{ color: "var(--text-dim)" }}>
                {k}: <strong className="font-medium" style={{ color: "var(--text-primary)" }}>{v}</strong>
              </span>
            ))}
          </div>
        </div>
      </Fade>

      <Divider />

      {/* ══════ THE PROBLEM ══════ */}
      <Fade>
        <div className="text-center max-w-[640px] mx-auto mb-4">
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-5" style={{ color: "var(--gold)" }}>
            The Problem
          </p>
          <h4 className="font-serif font-light leading-snug mb-6" style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "var(--text-primary)" }}>
            The bigger you grow,<br />the more you <strong className="font-semibold" style={{ color: "var(--gold)" }}>disconnect</strong>
          </h4>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="font-mono font-bold leading-none" style={{ fontSize: "clamp(48px, 8vw, 72px)", color: "var(--gold)" }}>80%</span>
            <span className="font-sans text-[15px] font-light" style={{ color: "var(--text-dim)" }}>of DMs go unanswered</span>
          </div>
          <p className="font-sans text-[14px] font-light leading-relaxed" style={{ color: "var(--text-dim)" }}>
            Every unanswered message is a missed connection, a lost sale, and a crack in the community an influencer spent years building. The real pain isn&apos;t laziness — it&apos;s time. Content creators simply can&apos;t be present 24/7. And every hour of silence costs them trust, engagement, and revenue.
          </p>
        </div>
      </Fade>

      <Divider />

      {/* ══════ THE SOLUTION ══════ */}
      <Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center mb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[3px] mb-4" style={{ color: "var(--gold)" }}>
              The Solution
            </p>
            <h4 className="font-serif text-[24px] font-light leading-snug mb-5" style={{ color: "var(--text-primary)" }}>
              A digital version of <strong className="font-medium" style={{ color: "var(--gold)" }}>you</strong> — that never sleeps
            </h4>
            <p className="font-sans text-[14px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
              bestie.ai is an AI agent that learns the influencer&apos;s personality, knowledge base, tone, and boundaries — then responds to every follower message in their voice. Not a chatbot with canned answers. A thinking, feeling, opinionated digital twin that knows everything the influencer knows.
            </p>
            <p className="font-sans text-[14px] font-light leading-relaxed mb-5" style={{ color: "var(--text-dim)" }}>
              It recommends products, shares links, handles customer service, manages coupon codes — and even surfaces audience insights the influencer can use to create better content.
            </p>
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, var(--gold-subtle, rgba(201,169,110,0.08)), rgba(201,169,110,0.03))" }}
            >
              <p className="font-mono text-[10px] tracking-[2px] uppercase mb-2" style={{ color: "var(--gold)" }}>This is not a bot</p>
              <p className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                It thinks. It speaks. It has opinions. It knows everything and responds like a real person who genuinely wants to help — just like the influencer would, if they had infinite time.
              </p>
            </div>
          </div>
          <PhoneFrame src={IMG_WELCOME} alt="bestie.ai welcome screen" />
        </div>
      </Fade>

      <Divider />

      {/* ══════ THE PRODUCT — PHONE SCREENS ══════ */}
      <Fade>
        <div className="text-center mb-6">
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            The Product
          </p>
          <h4 className="font-serif font-light mb-2" style={{ fontSize: "clamp(22px, 3vw, 34px)", color: "var(--text-primary)" }}>
            Four layers of intelligent engagement
          </h4>
          <p className="font-sans text-[14px] font-light max-w-[480px] mx-auto" style={{ color: "var(--text-dim)" }}>
            Every feature was designed to replicate the influencer&apos;s value — not just their words.
          </p>
        </div>
      </Fade>

      <Fade delay={0.1}>
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4">
          <PhoneFrame src={IMG_CHAT} alt="AI chat conversation" label="Smart Chat" />
          <PhoneFrame src={IMG_COUPONS} alt="Coupons dashboard" label="Coupons & Collabs" />
          <PhoneFrame src={IMG_SUPPORT} alt="Customer support form" label="Brand Support" />
        </div>
      </Fade>

      <Divider />

      {/* ══════ CAPABILITIES ══════ */}
      <Fade>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            Capabilities
          </p>
          <h4 className="font-serif font-light mb-8" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-primary)" }}>
            Built for creators. <span className="font-medium" style={{ color: "var(--gold)" }}>Designed for scale.</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </Fade>

      <Divider />

      {/* ══════ DATA LAYER / ANALYTICS ══════ */}
      <Fade>
        <div className="max-w-[800px] mx-auto">
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            Data Layer
          </p>
          <h4 className="font-serif text-[24px] font-light mb-8" style={{ color: "var(--text-primary)" }}>
            Real-time analytics that turn conversations into strategy
          </h4>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <img src={IMG_DASHBOARD} alt="bestie.ai analytics dashboard" className="w-full block" loading="lazy" />
          </div>
          <p className="text-center mt-4 font-sans text-[13px] italic font-light" style={{ color: "var(--text-dim)" }}>
            Live dashboard: conversations, messages, coupon usage, product clicks, conversion rates — everything the influencer needs to understand their community.
          </p>
        </div>
      </Fade>

      <Divider />

      {/* ══════ MY ROLE ══════ */}
      <Fade>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[3px] mb-3" style={{ color: "var(--gold)" }}>
            My Role
          </p>
          <h4 className="font-serif font-light mb-5" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-primary)" }}>
            From <span className="font-medium" style={{ color: "var(--gold)" }}>insight to product</span>
          </h4>
          <p className="font-sans text-[14px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
            bestie.ai was born from a real operational pain I experienced managing influencer campaigns at Leaders. Social managers were drowning in DMs they couldn&apos;t answer. I saw the gap — and turned it into a product.
          </p>
          <p className="font-sans text-[14px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
            I led every aspect of the product lifecycle except hands-on development: the creative concept, strategic positioning, product roadmap, UX flows, AI prompt architecture, content strategy, brand language, GTM planning, and the pitch that sold it internally and to clients.
          </p>
          <p className="font-sans text-[14px] font-light leading-relaxed mb-6" style={{ color: "var(--text-dim)" }}>
            The product grew from a time-saving tool for social managers into a standalone AI SaaS — now serving both influencers and brands.
          </p>

          <div className="flex flex-wrap gap-2">
            {roleTags.map((tag) => (
              <RoleTag key={tag}>{tag}</RoleTag>
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
