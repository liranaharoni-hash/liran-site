"use client";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[960px] mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <span
          className="font-mono text-[9px] tracking-[2px]"
          style={{ color: "var(--text-faint)" }}
        >
          © 2026 Liran Aharoni
        </span>
        <span
          className="font-sans text-[11px] italic font-light"
          style={{ color: "var(--text-faint)" }}
        >
          Built through thinking, iteration, and AI-assisted workflows.
        </span>
        <button
          onClick={onOpenModal}
          className="font-mono text-[9px] uppercase tracking-[2px] transition-colors hover:!text-[var(--gold)]"
          style={{ color: "var(--text-faint)" }}
        >
          How this site was built →
        </button>
      </div>
    </footer>
  );
}
