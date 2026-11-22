"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/base";
import type { Artwork } from "@/lib/content";
import { Lightbox } from "./Lightbox";

const MAX_SLIDES = 8; // the gallery can be large; the hero only previews the first few
const INTERVAL = 5000;

export function HeroCarousel({ items }: { items: Artwork[] }) {
  const slides = items.slice(0, MAX_SLIDES);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const step = useCallback((d: number) => setOpen((v) => (v === null ? v : (v + d + n) % n)), [n]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay: not while hovered/focused, with the viewer open, in a hidden tab, or with reduced motion.
  useEffect(() => {
    if (n < 2 || paused || reduce || open !== null) return;
    const t = setInterval(() => {
      if (!document.hidden) go(1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [n, paused, reduce, open, go]);

  if (!n) return null;
  const cur = slides[i];

  return (
    <div
      className="hc"
      role="region"
      aria-roledescription="carousel"
      aria-label="ציורים"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // swipe left → next (RTL)
      }}
    >
      <div className="hc-frame">
        {slides.map((a, k) => (
          <button
            key={a.id}
            className={`hc-slide${k === i ? " on" : ""}`}
            onClick={() => setOpen(k)}
            tabIndex={k === i ? 0 : -1}
            aria-hidden={k === i ? undefined : true}
            aria-label={a.title ? `הגדל: ${a.title}` : "הגדל ציור"}
          >
            <img src={asset(a.src)} alt={a.title} width={a.w} height={a.h} loading={k === 0 ? "eager" : "lazy"} decoding="async" />
          </button>
        ))}
        {n > 1 && (
          <>
            <button className="hc-btn hc-prev" aria-label="הקודם" onClick={() => go(-1)}>›</button>
            <button className="hc-btn hc-next" aria-label="הבא" onClick={() => go(1)}>‹</button>
          </>
        )}
      </div>

      <div className="hc-cap" aria-live="polite">{cur.title}</div>

      {n > 1 && (
        <div className="hc-dots">
          {slides.map((a, k) => (
            <button key={a.id} className={k === i ? "on" : ""} aria-label={`ציור ${k + 1} מתוך ${n}`} aria-current={k === i} onClick={() => setI(k)} />
          ))}
        </div>
      )}

      {open !== null && <Lightbox items={slides} index={open} onClose={close} onStep={step} />}
    </div>
  );
}
