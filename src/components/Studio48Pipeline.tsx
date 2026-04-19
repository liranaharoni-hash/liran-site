"use client";

import { useEffect, useRef } from "react";

type PipelineStep = {
  step: string;
  tag: string;
  title: string;
  desc: string;
  prompt: string[];
  image: { src: string; label: string };
  image2?: { src: string; label: string };
};

const steps: PipelineStep[] = [
  {
    step: "01",
    tag: "Step 01 — Input",
    title: "Raw Product Photo",
    desc: "The client sends a single photo — taken on a phone, in-store, on the floor. No studio, no lighting, no production budget. This is where most fashion brands start.",
    prompt: [
      "// INPUT ANALYSIS",
      "product: denim shorts",
      "texture: jacquard distressed pattern",
      "color: washed grey",
      "details: elastic waist, drawstring,",
      "  five-pocket construction",
      "→ extracting material + silhouette data",
    ],
    image: { src: "/images/pipeline/01-raw.jpg", label: "Client Input" },
  },
  {
    step: "02",
    tag: "Step 02 — Pack Shot",
    title: "Clean Product Isolation",
    desc: "AI-powered background removal and product reconstruction. The raw photo is transformed into a clean, e-commerce-ready pack shot with proper lighting, shadow, and presentation.",
    prompt: [
      "// PACK SHOT GENERATION",
      "isolated product on pure white bg,",
      "centered composition, soft natural",
      "shadow, e-commerce product photography",
      "style, clean studio lighting,",
      "--maintain exact fabric texture",
      "--preserve pattern + color fidelity",
    ],
    image: { src: "/images/pipeline/02-packshot.jpg", label: "Generated" },
  },
  {
    step: "03",
    tag: "Step 03 — Character Design",
    title: "AI Model Generation",
    desc: "A virtual model is created from scratch — designed to match the brand's target demographic. Full character reference sheet with consistent features across all angles.",
    prompt: [
      "// MODEL REFERENCE SHEET",
      "male model, Mediterranean features,",
      "age 28-32, athletic-lean build,",
      "dark wavy hair, light stubble,",
      "hazel-brown eyes, natural tan",
      "--multi-angle reference grid",
      "--consistent identity across poses",
      "--white t-shirt base for neutrality",
    ],
    image: { src: "/images/pipeline/03-model.jpg", label: "AI Model" },
  },
  {
    step: "04",
    tag: "Step 04 — Hero Shot",
    title: "E-Commerce Ready",
    desc: "Product meets model. The generated garment is fitted onto the AI model in a classic e-commerce hero pose — full body, clean background, natural proportions.",
    prompt: [
      "// PRODUCT + MODEL FUSION",
      "[model_ref] wearing [product_packshot]",
      "full body shot, relaxed casual pose,",
      "hands in pockets, clean studio bg,",
      "white oversized tee + white sneakers,",
      "--match fabric drape to body",
      "--natural fit, knee-length",
      "--e-commerce lighting standard",
    ],
    image: { src: "/images/pipeline/04-hero.jpg", label: "Hero Shot" },
  },
  {
    step: "05",
    tag: "Step 05 — Detail Shots",
    title: "Texture & Detail Library",
    desc: "A complete detail grid: front, back, side angles on-model, plus macro close-ups of the fabric texture, waistband construction, and hem finish.",
    prompt: [
      "// DETAIL SHOT MATRIX",
      "[model_ref] wearing [product] —",
      "generate: front waist-down crop,",
      "side profile full, back view,",
      "macro: jacquard texture 4x zoom,",
      "waistband button + drawstring detail,",
      "hem stitch close-up",
      "--consistent lighting across grid",
      "--studio grey background",
    ],
    image: { src: "/images/pipeline/05-details.jpg", label: "Detail Library" },
  },
  {
    step: "06",
    tag: "Step 06 — Lifestyle",
    title: "Urban Lifestyle Content",
    desc: "The final layer — atmospheric lifestyle shots that tell a story. Same model, same product, now placed in real-world urban environments. Content ready for social, ads, and brand storytelling.",
    prompt: [
      "// LIFESTYLE VARIATIONS",
      "[model_ref] wearing [product] +",
      "white oversized tee + white sneakers",
      "",
      "var_A: rooftop, golden hour, leaning",
      "  on concrete wall, city skyline bg",
      "var_B: narrow urban alley, warm side",
      "  light, walking pose, textured walls",
      "--cinematic color grade",
      "--natural ambient lighting",
      "--editorial fashion photography",
    ],
    image: { src: "/images/pipeline/06-lifestyle-a.jpg", label: "Rooftop" },
    image2: { src: "/images/pipeline/06-lifestyle-b.jpg", label: "Street" },
  },
];

const stats = [
  { value: "1", label: "Input Photo" },
  { value: "10+", label: "Output Assets" },
  { value: "0", label: "Studio Hours" },
  { value: "0", label: "Models Hired" },
];

function PromptBox({ lines }: { lines: string[] }) {
  return (
    <div
      className="relative rounded-md overflow-hidden border"
      style={{ backgroundColor: "var(--bg-expanded, var(--bg-surface))", borderColor: "var(--border)" }}
    >
      <div
        className="absolute top-0 end-0 font-mono text-[8px] tracking-[2px] uppercase px-2.5 py-1 rounded-es-md"
        style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
      >
        PROMPT
      </div>
      <div className="p-4 pt-5">
        <code className="font-mono text-[11px] leading-[1.8] block whitespace-pre-wrap" style={{ color: "var(--text-dim)" }}>
          {lines.map((line, i) => {
            const isHighlight = line.startsWith("//") || line.startsWith("→") || line.startsWith("--");
            return (
              <span key={i}>
                {isHighlight ? <span style={{ color: "var(--gold)" }}>{line}</span> : line}
                {i < lines.length - 1 ? "\n" : ""}
              </span>
            );
          })}
        </code>
      </div>
    </div>
  );
}

function StepImage({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative rounded-[8px] overflow-hidden border group/img"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <img
        src={src}
        alt={label}
        className="w-full block transition-transform duration-500 group-hover/img:scale-[1.03]"
        loading="lazy"
      />
      <div
        className="absolute top-2.5 start-2.5 font-mono text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", color: "var(--gold)" }}
      >
        {label}
      </div>
    </div>
  );
}

function FadeStep({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add("pipeline-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="pipeline-step"
      style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
    >
      {children}
    </div>
  );
}

export default function Studio48Pipeline({ heroQuote, whatThisProves, whatThisProvesLabel }: { heroQuote?: string; whatThisProves?: readonly string[]; whatThisProvesLabel?: string }) {
  return (
    <div className="mt-2">
      {/* ══════ HERO QUOTE ══════ */}
      {heroQuote && (
        <FadeStep delay={0}>
          <p className="font-serif text-[22px] md:text-[26px] italic font-light leading-relaxed text-center mb-10" style={{ color: "var(--text-primary)" }}>
            &ldquo;{heroQuote}&rdquo;
          </p>
        </FadeStep>
      )}

      <h4 className="font-serif text-[22px] font-light mb-2" style={{ color: "var(--text-primary)" }}>
        One Photo → Full Visual Library
      </h4>
      <p className="font-sans text-[13px] font-light leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
        How Studio 48 transforms a single store-shot into a complete e-commerce visual library using AI.
      </p>

      {/* Pipeline timeline */}
      <div className="relative pipeline-container">
        {/* Center line — desktop only */}
        <div
          className="absolute top-0 bottom-0 start-1/2 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border) 5%, var(--border) 95%, transparent)" }}
        />

        {/* Mobile left line */}
        <div
          className="absolute top-0 bottom-0 start-5 w-px block md:hidden"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border) 5%, var(--border) 95%, transparent)" }}
        />

        {steps.map((s, i) => {
          const isReversed = i % 2 !== 0;

          return (
            <FadeStep key={s.step} delay={i * 0.1}>
              <div className="relative mb-16 last:mb-0">
                {/* Step number node */}
                <div
                  className="absolute z-10 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[12px] font-bold md:start-1/2 md:-translate-x-1/2 start-[6px]"
                  style={{ backgroundColor: "var(--gold)", color: "var(--bg)", top: "50%", transform: "translateY(-50%)" }}
                >
                  {s.step}
                </div>

                {/* Content grid */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 ps-14 md:ps-0 ${isReversed ? "md:direction-rtl" : ""}`}
                >
                  {/* Image side */}
                  <div className={`${isReversed ? "md:order-2" : "md:order-1"}`} style={{ direction: "ltr" }}>
                    {s.image2 ? (
                      <div className="grid grid-cols-1 gap-4">
                        <StepImage src={s.image.src} label={s.image.label} />
                        <StepImage src={s.image2.src} label={s.image2.label} />
                      </div>
                    ) : (
                      <StepImage src={s.image.src} label={s.image.label} />
                    )}
                  </div>

                  {/* Info side */}
                  <div className={`${isReversed ? "md:order-1" : "md:order-2"}`} style={{ direction: "ltr" }}>
                    <p className="font-mono text-[9px] uppercase tracking-[3px] mb-2" style={{ color: "var(--gold)" }}>
                      {s.tag}
                    </p>
                    <h5 className="font-serif text-[20px] font-light mb-3" style={{ color: "var(--text-primary)" }}>
                      {s.title}
                    </h5>
                    <p className="font-sans text-[13px] font-light leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
                      {s.desc}
                    </p>
                    <PromptBox lines={s.prompt} />
                  </div>
                </div>
              </div>
            </FadeStep>
          );
        })}
      </div>

      {/* Stats */}
      <FadeStep delay={0.6}>
        <div className="text-center mt-16 pt-12" style={{ borderTop: "1px solid var(--border)" }}>
          <h4 className="font-serif text-[24px] font-light mb-2" style={{ color: "var(--text-primary)" }}>
            1 Photo → <span style={{ color: "var(--gold)" }}>Full Visual Library</span>
          </h4>
          <p className="font-sans text-[13px] font-light mb-8" style={{ color: "var(--text-dim)" }}>
            Complete e-commerce content package generated from a single product image.
          </p>
          <div className="flex justify-center flex-wrap gap-10 md:gap-14">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-[36px] md:text-[48px] font-bold leading-none" style={{ color: "var(--gold)" }}>
                  {s.value}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[2px] mt-2" style={{ color: "var(--text-dim)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeStep>

      {/* ══════ WHAT THIS PROVES ══════ */}
      {whatThisProves && whatThisProves.length > 0 && (
        <FadeStep delay={0.7}>
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
        </FadeStep>
      )}
    </div>
  );
}
