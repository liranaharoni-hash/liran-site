"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

type Brand = {
  readonly name: string;
  readonly caseStudy: string;
  readonly results: string;
  readonly videos: readonly {
    readonly title: string;
    readonly youtubeId: string;
    readonly type: "horizontal" | "vertical";
  }[];
};

/* ─── Brand Card (grid item) ─── */

function BrandCard({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <div
      className="rounded-[8px] overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-[2px] flex items-center justify-center"
      style={{
        aspectRatio: "1/1",
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
      <span
        className="font-serif text-[24px] font-light text-center px-4 select-none"
        style={{ color: "var(--text-primary)" }}
      >
        {name}
      </span>
    </div>
  );
}

/* ─── Video Thumbnail (collage item) ─── */

function VideoThumb({
  video,
  onClick,
}: {
  video: Brand["videos"][number];
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer rounded-[8px] overflow-hidden relative transition-all duration-200 hover:scale-[1.03] hover:brightness-110 ${video.type === "horizontal" ? "collage-thumb-h" : "collage-thumb-v"}`}
      style={{
        gridColumn: video.type === "horizontal" ? "span 2" : "span 1",
        gridRow: video.type === "horizontal" ? "span 2" : "span 3",
      }}
      onClick={onClick}
    >
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
        >
          <svg width="9" height="11" viewBox="0 0 10 12" fill="none" className="ms-0.5">
            <path d="M0 0L10 6L0 12V0Z" fill="white" fillOpacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Uniform grid for all-same-orientation brands ─── */

function VideoThumbUniform({
  video,
  onClick,
}: {
  video: Brand["videos"][number];
  onClick: () => void;
}) {
  return (
    <div
      className="cursor-pointer rounded-[8px] overflow-hidden relative transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
      style={{ aspectRatio: video.type === "vertical" ? "9/16" : "16/9" }}
      onClick={onClick}
    >
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
        >
          <svg width="9" height="11" viewBox="0 0 10 12" fill="none" className="ms-0.5">
            <path d="M0 0L10 6L0 12V0Z" fill="white" fillOpacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Brand Detail Modal ─── */

function BrandModal({
  brandIndex,
  brands,
  onClose,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  brandIndex: number;
  brands: readonly Brand[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  const brand = brands[brandIndex];
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Reset playing video when brand changes
  useEffect(() => {
    setPlayingIndex(null);
  }, [brandIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (playingIndex !== null) {
          setPlayingIndex(null);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext, playingIndex]);

  const playingVideo = playingIndex !== null ? brand.videos[playingIndex] : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 backdrop-blur-sm" style={{ backgroundColor: "var(--overlay)" }} />
      <div
        className="relative border rounded-lg w-full max-w-[900px] my-auto"
        style={{ backgroundColor: "var(--modal-bg)", borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 end-4 transition-colors text-xl hover:!text-[var(--gold)]"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            ×
          </button>

          {/* Brand header */}
          <h3
            className="font-serif text-[28px] font-light mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {brand.name}
          </h3>
          <p
            className="font-mono text-[10px] uppercase tracking-[2px] mb-6"
            style={{ color: "var(--gold)" }}
          >
            LEADERS
          </p>

          {/* Case study text */}
          <p
            className="font-sans text-[14px] font-light leading-relaxed mb-2"
            style={{ color: "var(--text-secondary)", maxWidth: "600px" }}
          >
            {brand.caseStudy}
          </p>

          {/* Results */}
          {brand.results && (
            <p
              className="font-mono text-[11px] tracking-[0.5px] mb-8"
              style={{ color: "var(--gold)" }}
            >
              {brand.results}
            </p>
          )}

          {!brand.results && <div className="mb-6" />}

          {/* Active video player */}
          {playingVideo && (
            <div className="mb-6">
              <div
                className="relative rounded-[8px] overflow-hidden mx-auto"
                style={{
                  aspectRatio: playingVideo.type === "vertical" ? "9/16" : "16/9",
                  maxHeight: playingVideo.type === "vertical" ? "500px" : undefined,
                  width: playingVideo.type === "vertical" ? "auto" : "100%",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="font-sans text-[13px]" style={{ color: "var(--text-muted)" }}>
                  {playingVideo.title}
                </p>
                <button
                  onClick={() => setPlayingIndex(null)}
                  className="font-mono text-[10px] uppercase tracking-[1px] transition-opacity hover:opacity-70"
                  style={{ color: "var(--gold)" }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Video collage grid */}
          {(() => {
            const hasHorizontal = brand.videos.some((v) => v.type === "horizontal");
            const hasVertical = brand.videos.some((v) => v.type === "vertical");
            const isMixed = hasHorizontal && hasVertical;

            if (isMixed) {
              // Moodboard collage: dense grid with variable spans
              return (
                <div
                  className="collage-grid grid gap-2"
                  style={{
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridAutoRows: "120px",
                    gridAutoFlow: "dense",
                  }}
                >
                  {brand.videos.map((video, i) => (
                    <VideoThumb
                      key={video.youtubeId}
                      video={video}
                      onClick={() => setPlayingIndex(i)}
                    />
                  ))}
                </div>
              );
            }

            // All same orientation — clean uniform grid
            const cols = brand.videos.length <= 3 ? brand.videos.length : hasVertical ? 3 : 2;
            return (
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {brand.videos.map((video, i) => (
                  <VideoThumbUniform
                    key={video.youtubeId}
                    video={video}
                    onClick={() => setPlayingIndex(i)}
                  />
                ))}
              </div>
            );
          })()}

          {/* Prev / Next navigation */}
          <div
            className="flex justify-between items-center pt-6 mt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              onClick={onPrev}
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              {prevLabel}
            </button>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
              {brandIndex + 1} / {brands.length}
            </span>
            <button
              onClick={onNext}
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Showreel Embed ─── */

function Showreel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Intersection Observer: play when visible, pause when not
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-[14px] overflow-hidden border group"
      style={{
        aspectRatio: "16/9",
        borderColor: "var(--gold-border)",
        backgroundColor: "var(--showreel-bg)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/videos/showreel.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Mute toggle — hover on desktop, always visible on mobile */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 end-3 z-20 flex items-center justify-center rounded-full backdrop-blur-sm transition-opacity duration-300"
        style={{
          width: 36,
          height: 36,
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity: isMobile || hovered ? 1 : 0,
        }}
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

/* ─── Main Creative Section ─── */

export default function Creative() {
  const { t } = useLang();
  const [gridOpen, setGridOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  const brands = t.creative.brands;

  const openBrand = useCallback((i: number) => setActiveBrand(i), []);
  const closeBrand = useCallback(() => setActiveBrand(null), []);
  const prevBrand = useCallback(
    () => setActiveBrand((p) => (p === null ? null : p === 0 ? brands.length - 1 : p - 1)),
    [brands.length]
  );
  const nextBrand = useCallback(
    () => setActiveBrand((p) => (p === null ? null : p === brands.length - 1 ? 0 : p + 1)),
    [brands.length]
  );

  return (
    <section id="creative" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">{t.creative.label}</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[36px] font-light mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            {t.creative.title}
          </h2>
        </FadeIn>

        {/* Showreel */}
        <FadeIn delay={0.16}>
          <Showreel />
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
              onMouseEnter={(e) => {
                if (!gridOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-subtle)";
              }}
              onMouseLeave={(e) => {
                if (!gridOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {gridOpen ? t.creative.closeBtn : t.creative.exploreBtn}
            </button>
          </div>
        </FadeIn>

        {/* Brand Cards Grid */}
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            maxHeight: gridOpen ? "2000px" : "0px",
            opacity: gridOpen ? 1 : 0,
            marginTop: gridOpen ? "32px" : "0px",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {brands.map((brand, i) => (
              <BrandCard key={i} name={brand.name} onClick={() => openBrand(i)} />
            ))}
          </div>
        </div>

        {/* Closing line */}
        <FadeIn delay={0.32}>
          <p
            className="font-sans text-[13px] italic font-light leading-relaxed mt-12 text-center whitespace-pre-line"
            style={{ color: "var(--text-dim)" }}
          >
            {t.creative.closingLine}
          </p>
        </FadeIn>
      </div>

      {/* Brand Detail Modal */}
      {activeBrand !== null && (
        <BrandModal
          brandIndex={activeBrand}
          brands={brands}
          onClose={closeBrand}
          onPrev={prevBrand}
          onNext={nextBrand}
          prevLabel={t.creative.prevBrand}
          nextLabel={t.creative.nextBrand}
        />
      )}
    </section>
  );
}
