"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "./ThemeContext";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, isHe } = useLang();
  const { dark } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const hero = heroRef.current;
        const photo = photoRef.current;
        const spotlight = spotlightRef.current;
        if (!hero || !photo) return;

        const rect = hero.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Parallax — photo moves opposite to mouse
        const dirX = isHe ? 1 : -1; // flip for RTL
        const ox = ((mx - cx) / cx) * 15 * dirX;
        const oy = ((my - cy) / cy) * -10;
        photo.style.transform = `translate(${ox}px, ${oy}px)`;

        // Spotlight position relative to photo container
        if (spotlight) {
          const pr = photo.getBoundingClientRect();
          const sx = e.clientX - pr.left;
          const sy = e.clientY - pr.top;
          spotlight.style.setProperty("--sx", `${sx}px`);
          spotlight.style.setProperty("--sy", `${sy}px`);
        }
      });
    },
    [isMobile, isHe]
  );

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setHovering(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    const photo = photoRef.current;
    if (photo) photo.style.transform = "translate(0, 0)";
  }, []);

  // Photo filter values per mode
  const baseFilter = dark
    ? "brightness(0.5) contrast(0.85) saturate(0)"
    : "brightness(0.85) contrast(0.95) saturate(0) sepia(0.05)";
  const hoverFilter = dark
    ? "brightness(1.1) contrast(1.3) saturate(0)"
    : "brightness(1.05) contrast(1.05) saturate(0) sepia(0.05)";
  const spotlightRadius = dark ? 200 : 300;

  // Mask — soft oval, center shifted slightly toward the person
  const maskCenter = isHe ? "45% 45%" : "55% 45%";
  const mask = `radial-gradient(ellipse 90% 95% at ${maskCenter}, black 50%, transparent 100%)`;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gold glow */}
      <div
        className="absolute top-0 end-0 w-[500px] h-[500px] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: "var(--glow-opacity)",
        }}
      />

      {/* Desktop photo */}
      <div
        ref={photoRef}
        className={`absolute top-0 bottom-0 hidden md:block pointer-events-none ${
          isHe ? "left-0" : "right-0"
        }`}
        style={{
          width: "45vw",
          transition: "transform 0.3s ease-out",
          willChange: "transform",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        <Image
          src="/images/liran-portrait.jpg"
          alt="Liran Aharoni"
          fill
          className="object-cover object-top"
          style={{
            filter: hovering ? hoverFilter : baseFilter,
            transition: "filter 0.5s ease",
            willChange: "filter",
          }}
          sizes="45vw"
          priority
        />

        {/* Spotlight overlay */}
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle ${spotlightRadius}px at var(--sx, 50%) var(--sy, 50%), transparent 0%, rgba(0,0,0,${dark ? 0.5 : 0.3}) 100%)`,
            mixBlendMode: "multiply",
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Mobile photo — static, no spotlight */}
      <div
        className="relative md:hidden flex justify-center pt-24 pb-4"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 85% at 50% 40%, black 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 85% at 50% 40%, black 50%, transparent 100%)",
        }}
      >
        <div className="relative w-[300px]" style={{ aspectRatio: "3/4" }}>
          <Image
            src="/images/liran-portrait.jpg"
            alt="Liran Aharoni"
            fill
            className="object-cover object-top"
            style={{
              filter: dark
                ? "brightness(0.8) contrast(1.2) saturate(0)"
                : "brightness(1.0) contrast(1.0) saturate(0) sepia(0.05)",
            }}
            sizes="300px"
            priority
          />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-[960px] mx-auto px-6 pt-8 pb-20 md:pt-36 md:pb-28">
        <div className="md:max-w-[55%]">
          <FadeIn>
            <p className="label mb-6">{t.hero.label}</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              className="font-serif font-light leading-[1.2] mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 50px)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>
                {t.hero.headline1}
              </span>
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                {t.hero.headline2}
              </span>
              {t.hero.headline3 && (
                <>
                  <br />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {t.hero.headline3}
                  </span>
                </>
              )}
              <br />
              <span style={{ color: "var(--gold)" }}>
                {t.hero.headline4}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              {t.hero.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p
              className="font-sans text-[13px] font-light leading-relaxed mb-8"
              style={{ color: "var(--text-dim)" }}
            >
              {t.hero.intro}
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
                {t.hero.ctaSystems}
              </a>
              <a
                href="#creative"
                className="inline-block px-5 py-2.5 border text-[13px] font-sans font-light rounded-[5px] transition-colors"
                style={{
                  borderColor: "var(--cta-secondary-border)",
                  color: "var(--cta-secondary-text)",
                }}
              >
                {t.hero.ctaCreative}
              </a>
              <a
                href="#contact"
                className="inline-block px-5 py-2.5 text-[13px] font-sans font-light transition-colors hover:!text-[var(--gold)]"
                style={{ color: "var(--text-dim)" }}
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.36}>
            <p
              className="font-mono text-[10px] tracking-[2px] mb-5"
              style={{ color: "var(--text-faint)" }}
            >
              {t.hero.microcopy}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <button
              onClick={onOpenModal}
              className="font-mono text-[10px] uppercase tracking-[3px] transition-colors hover:!text-[var(--gold)]"
              style={{ color: "var(--text-faint)" }}
            >
              {t.hero.builtWith}
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
