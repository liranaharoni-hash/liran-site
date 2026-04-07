"use client";

import { useState, useEffect, useCallback } from "react";
import FadeIn from "./FadeIn";

type VideoOrientation = "horizontal" | "vertical";

type CreativeItem = {
  title: string;
  context: string;
  description: string;
  type: "video" | "visual";
  orientation?: VideoOrientation;
};

const items: CreativeItem[] = [
  {
    title: "SodaStream — Spirit of Water",
    context: "LEADERS · Campaign Film",
    description:
      "Hero campaign film for SodaStream product launch — concept, direction, and production.",
    type: "video",
    orientation: "horizontal",
  },
  {
    title: "Sony PlayStation — Community",
    context: "LEADERS · Social & Content",
    description:
      "Multi-platform content strategy and production for PlayStation Israel gaming community.",
    type: "video",
    orientation: "horizontal",
  },
  {
    title: "Estée Lauder — Beauty Campaign",
    context: "LEADERS · Influencer Content",
    description:
      "High-end influencer content production and creative direction for beauty campaigns.",
    type: "video",
    orientation: "vertical",
  },
  {
    title: "Flormar — Product Launch",
    context: "LEADERS · Campaign",
    description:
      "Creative direction and campaign production for Flormar Israel product launches.",
    type: "video",
    orientation: "vertical",
  },
  {
    title: "AI Fashion Visuals",
    context: "Studio48 · AI Production",
    description:
      "AI-generated fashion and product imagery created as part of the Studio48 production system. Demonstrating how AI tools can complement traditional photo production.",
    type: "visual",
  },
  {
    title: "Brand Showreel 2024",
    context: "Various · Direction & Editing",
    description:
      "Compilation of campaign work, brand films, and production highlights from recent years.",
    type: "video",
    orientation: "horizontal",
  },
  {
    title: "Influencer Campaign Series",
    context: "LEADERS · Multi-Creator",
    description:
      "Multi-creator campaign production — coordinating content across influencers for unified brand messaging.",
    type: "video",
    orientation: "vertical",
  },
  {
    title: "Social Content Systems",
    context: "Various · Content Strategy",
    description:
      "Social content frameworks and platform-native content production. Building repeatable content systems rather than one-off posts.",
    type: "visual",
  },
  {
    title: "Campaign — Behind the Scenes",
    context: "LEADERS · Production",
    description:
      "Behind-the-scenes production content from major campaign shoots — showing process and craft.",
    type: "video",
    orientation: "horizontal",
  },
  {
    title: "Product Launch Content",
    context: "Various · Content Production",
    description:
      "Product-focused content production for digital launches — designed for performance and engagement.",
    type: "video",
    orientation: "vertical",
  },
  {
    title: "Editorial & Brand Films",
    context: "Various · Direction",
    description:
      "Editorial-style brand films and short-form content — balancing brand storytelling with commercial clarity.",
    type: "video",
    orientation: "horizontal",
  },
  {
    title: "Creative Direction Highlights",
    context: "2019–2025 · Selected Work",
    description:
      "Selected highlights from years of creative direction across campaigns, productions, and brand systems.",
    type: "visual",
  },
];

/* ── Small play icon for grid thumbnails ── */
function SmallPlayIcon() {
  return (
    <div
      className="w-9 h-9 rounded-full border flex items-center justify-center"
      style={{
        borderColor: "var(--gold-border)",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <svg
        width="10"
        height="12"
        viewBox="0 0 10 12"
        fill="none"
        className="ml-0.5"
      >
        <path d="M0 0L10 6L0 12V0Z" fill="var(--gold)" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/* ── Grid thumbnail card ── */
function GridCard({
  item,
  onClick,
}: {
  item: CreativeItem;
  onClick: () => void;
}) {
  return (
    <div
      className="rounded-[8px] overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-[2px]"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative"
        style={{
          aspectRatio: "4/5",
          background: `
            linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to)),
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 32px 32px, 32px 32px",
        }}
      >
        {/* Play icon overlay for video items */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <SmallPlayIcon />
          </div>
        )}

        {/* Title overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          }}
        >
          <p className="font-mono text-[10px] tracking-[1px] text-white/80 truncate">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Lightbox modal ── */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const videoAspect =
    item.type === "video"
      ? item.orientation === "vertical"
        ? "9/16"
        : "16/9"
      : "16/9";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-10 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "var(--overlay)" }}
      />

      {/* Modal content */}
      <div
        className="relative border rounded-lg w-full max-w-[800px] my-auto"
        style={{
          backgroundColor: "var(--modal-bg)",
          borderColor: "var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 transition-colors text-lg hover:!text-[var(--gold)]"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            ×
          </button>

          {/* Video/Visual placeholder */}
          <div
            className="relative rounded-md overflow-hidden flex items-center justify-center mx-auto mb-6"
            style={{
              aspectRatio: videoAspect,
              maxHeight: item.orientation === "vertical" ? "500px" : undefined,
              width: item.orientation === "vertical" ? "auto" : "100%",
              background: `
                linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to)),
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            }}
          >
            {item.type === "video" && (
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
            )}
          </div>

          {/* Title + context */}
          <h3
            className="font-serif text-[22px] font-light mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {item.title}
          </h3>
          <p
            className="font-mono text-[10px] uppercase tracking-[2px] mb-4"
            style={{ color: "var(--gold)" }}
          >
            {item.context}
          </p>

          {/* Description */}
          <p
            className="font-sans text-[14px] font-light leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            {item.description}
          </p>

          {/* Prev / Next */}
          <div
            className="flex justify-between items-center pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              onClick={onPrev}
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              ← Prev
            </button>
            <span
              className="font-mono text-[10px]"
              style={{ color: "var(--text-faint)" }}
            >
              {index + 1} / {items.length}
            </span>
            <button
              onClick={onNext}
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Creative Section ── */
export default function Creative() {
  const [gridOpen, setGridOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
      ),
    []
  );
  const nextItem = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
      ),
    []
  );

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

        {/* View Selected Work button */}
        <FadeIn delay={0.24}>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setGridOpen(!gridOpen)}
              className="border rounded-full px-6 py-2.5 font-mono text-[12px] uppercase tracking-[2px] transition-all duration-300"
              style={{
                borderColor: gridOpen
                  ? "var(--gold)"
                  : "var(--cta-secondary-border)",
                color: gridOpen ? "var(--gold)" : "var(--cta-secondary-text)",
                backgroundColor: gridOpen
                  ? "var(--gold-subtle)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!gridOpen) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--gold-subtle)";
                }
              }}
              onMouseLeave={(e) => {
                if (!gridOpen) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }
              }}
            >
              {gridOpen ? "× Close" : "Explore Projects"}
            </button>
          </div>
        </FadeIn>

        {/* Instagram-style grid */}
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            maxHeight: gridOpen ? "2000px" : "0px",
            opacity: gridOpen ? 1 : 0,
            marginTop: gridOpen ? "32px" : "0px",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, i) => (
              <GridCard
                key={i}
                item={item}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        </div>

        {/* Closing line — always at bottom */}
        <FadeIn delay={0.32}>
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

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  );
}
