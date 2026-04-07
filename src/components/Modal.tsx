"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "var(--overlay)" }}
      />
      <div
        className="relative border rounded-lg max-w-[460px] w-full p-8"
        style={{
          backgroundColor: "var(--modal-bg)",
          borderColor: "var(--gold-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors text-lg hover:!text-[var(--gold)]"
          style={{ color: "var(--text-dim)" }}
          aria-label="Close"
        >
          ×
        </button>

        <p className="label mb-6">HOW THIS SITE WAS BUILT</p>

        <p
          className="font-sans text-[15px] font-light leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          This site was structured and iterated using AI tools as part of an
          ongoing exploration into systems, workflows, product thinking, and
          real-world application.
        </p>

        <p
          className="font-sans text-[13px] font-light leading-relaxed"
          style={{ color: "var(--text-dim)" }}
        >
          The design, copy, and architecture reflect the same approach described
          in the case studies — a combination of strategic thinking and
          AI-assisted iteration.
        </p>
      </div>
    </div>
  );
}
