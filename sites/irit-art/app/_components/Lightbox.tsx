"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/base";
import type { Artwork } from "@/lib/content";

/**
 * Full-screen viewer shared by the gallery and the hero carousel.
 * Rendered in a portal so the sticky nav (a different stacking context) can't cover it.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Artwork[];
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const touchX = useRef<number | null>(null);
  const cur = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // RTL: the "next" arrow points left.
      if (e.key === "ArrowLeft") onStep(1);
      if (e.key === "ArrowRight") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  if (!cur) return null;
  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={cur.title || "ציור"}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1); // swipe left → next (RTL)
      }}
    >
      <button className="lb-btn lb-close" aria-label="סגור" onClick={onClose}>×</button>
      {items.length > 1 && (
        <>
          <button className="lb-btn lb-prev" aria-label="הקודם" onClick={(e) => (e.stopPropagation(), onStep(-1))}>›</button>
          <button className="lb-btn lb-next" aria-label="הבא" onClick={(e) => (e.stopPropagation(), onStep(1))}>‹</button>
        </>
      )}
      <figure className={cur.description ? "has-text" : ""} onClick={(e) => e.stopPropagation()}>
        <img key={cur.id} src={asset(cur.src)} alt={cur.title} />
        {(cur.title || cur.description) && (
          <figcaption>
            {cur.title && <h3 className="lb-title">{cur.title}</h3>}
            {cur.description && <p className="lb-desc">{cur.description}</p>}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body,
  );
}
