"use client";

import { useState, useEffect, useCallback } from "react";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

type VideoOrientation = "horizontal" | "vertical";
type ItemType = "video" | "visual";

const itemMeta: { type: ItemType; orientation?: VideoOrientation }[] = [
  { type: "video", orientation: "horizontal" },
  { type: "video", orientation: "horizontal" },
  { type: "video", orientation: "vertical" },
  { type: "video", orientation: "vertical" },
  { type: "visual" },
  { type: "video", orientation: "horizontal" },
  { type: "video", orientation: "vertical" },
  { type: "visual" },
  { type: "video", orientation: "horizontal" },
  { type: "video", orientation: "vertical" },
  { type: "video", orientation: "horizontal" },
  { type: "visual" },
];

function SmallPlayIcon() {
  return (
    <div
      className="w-9 h-9 rounded-full border flex items-center justify-center"
      style={{
        borderColor: "var(--gold-border)",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="ms-0.5">
        <path d="M0 0L10 6L0 12V0Z" fill="var(--gold)" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

function GridCard({
  title,
  isVideo,
  onClick,
}: {
  title: string;
  isVideo: boolean;
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
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
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
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <SmallPlayIcon />
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
        >
          <p className="font-mono text-[10px] tracking-[1px] text-white/80 truncate">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  index,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  items: readonly { readonly title: string; readonly context: string; readonly desc: string }[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const meta = itemMeta[index];
  const videoAspect = meta.type === "video" ? (meta.orientation === "vertical" ? "9/16" : "16/9") : "16/9";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-10 px-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 backdrop-blur-sm" style={{ backgroundColor: "var(--overlay)" }} />
      <div
        className="relative border rounded-lg w-full max-w-[800px] my-auto"
        style={{ backgroundColor: "var(--modal-bg)", borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 transition-colors text-lg hover:!text-[var(--gold)]"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            ×
          </button>

          <div
            className="relative rounded-md overflow-hidden flex items-center justify-center mx-auto mb-6"
            style={{
              aspectRatio: videoAspect,
              maxHeight: meta.orientation === "vertical" ? "500px" : undefined,
              width: meta.orientation === "vertical" ? "auto" : "100%",
              background: `
                linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to)),
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            }}
          >
            {meta.type === "video" && (
              <div className="w-14 h-14 rounded-full border flex items-center justify-center" style={{ borderColor: "var(--gold-border)" }}>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ms-1">
                  <path d="M0 0L18 10L0 20V0Z" fill="var(--gold)" fillOpacity="0.5" />
                </svg>
              </div>
            )}
          </div>

          <h3 className="font-serif text-[22px] font-light mb-1" style={{ color: "var(--text-primary)" }}>
            {item.title}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[2px] mb-4" style={{ color: "var(--gold)" }}>
            {item.context}
          </p>
          <p className="font-sans text-[14px] font-light leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            {item.desc}
          </p>

          <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={onPrev} className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70" style={{ color: "var(--gold)" }}>
              ← Prev
            </button>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
              {index + 1} / {items.length}
            </span>
            <button onClick={onNext} className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70" style={{ color: "var(--gold)" }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Creative() {
  const { t } = useLang();
  const [gridOpen, setGridOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = t.creative.items;
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((p) => (p === null ? null : p === 0 ? items.length - 1 : p - 1)), [items.length]);
  const nextItem = useCallback(() => setLightboxIndex((p) => (p === null ? null : p === items.length - 1 ? 0 : p + 1)), [items.length]);

  return (
    <section id="creative" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">{t.creative.label}</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="font-serif text-[36px] font-light mb-10" style={{ color: "var(--text-primary)" }}>
            {t.creative.title}
          </h2>
        </FadeIn>

        {/* Showreel */}
        <FadeIn delay={0.16}>
          <div
            className="relative rounded-[14px] overflow-hidden border"
            style={{ aspectRatio: "21/9", backgroundColor: "var(--showreel-bg)", borderColor: "var(--border)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-12 z-10" style={{ background: "linear-gradient(to bottom, var(--showreel-bg), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-12 z-10" style={{ background: "linear-gradient(to top, var(--showreel-bg), transparent)" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center" style={{ borderColor: "var(--gold-border)" }}>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ms-1">
                  <path d="M0 0L18 10L0 20V0Z" fill="var(--gold)" fillOpacity="0.5" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[3px]" style={{ color: "var(--text-dim)" }}>
                SHOWREEL
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Explore button */}
        <FadeIn delay={0.24}>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setGridOpen(!gridOpen)}
              className="border rounded-full px-6 py-2.5 font-mono text-[12px] uppercase tracking-[2px] transition-all duration-300"
              style={{
                borderColor: gridOpen ? "var(--gold)" : "var(--cta-secondary-border)",
                color: gridOpen ? "var(--gold)" : "var(--cta-secondary-text)",
                backgroundColor: gridOpen ? "var(--gold-subtle)" : "transparent",
              }}
              onMouseEnter={(e) => { if (!gridOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-subtle)"; }}
              onMouseLeave={(e) => { if (!gridOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              {gridOpen ? t.creative.closeBtn : t.creative.exploreBtn}
            </button>
          </div>
        </FadeIn>

        {/* Grid */}
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ maxHeight: gridOpen ? "2000px" : "0px", opacity: gridOpen ? 1 : 0, marginTop: gridOpen ? "32px" : "0px" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, i) => (
              <GridCard key={i} title={item.title} isVideo={itemMeta[i].type === "video"} onClick={() => openLightbox(i)} />
            ))}
          </div>
        </div>

        {/* Closing line */}
        <FadeIn delay={0.32}>
          <p className="font-sans text-[13px] italic font-light leading-relaxed mt-12 text-center whitespace-pre-line" style={{ color: "var(--text-dim)" }}>
            {t.creative.closingLine}
          </p>
        </FadeIn>
      </div>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} items={items} onClose={closeLightbox} onPrev={prevItem} onNext={nextItem} />
      )}
    </section>
  );
}
