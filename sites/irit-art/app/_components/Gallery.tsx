"use client";
import { useCallback, useEffect, useState } from "react";
import { asset } from "@/lib/base";
import type { Artwork } from "@/lib/content";
import { Lightbox } from "./Lightbox";

export function Gallery({ items }: { items: Artwork[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());

  // Reveal each piece as it scrolls into view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const ids = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.id!);
        if (!ids.length) return;
        setVisible((prev) => new Set([...prev, ...ids]));
        entries.forEach((e) => e.isIntersecting && io.unobserve(e.target));
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll<HTMLElement>(".piece").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setOpen(null), []);

  if (!items.length) return <p className="muted center">הציורים יעלו בקרוב</p>;

  return (
    <>
      <div className="masonry">
        {items.map((a, i) => (
          <button
            key={a.id}
            data-id={a.id}
            className={`piece${visible.has(a.id) ? " in" : ""}`}
            style={{ aspectRatio: `${a.w} / ${a.h}`, transitionDelay: `${(i % 3) * 90}ms` }}
            onClick={() => setOpen(i)}
            aria-label={a.title ? `הגדל: ${a.title}` : "הגדל ציור"}
          >
            <img src={asset(a.src)} alt={a.title} width={a.w} height={a.h} loading="lazy" decoding="async" />
            {a.title && <span className="piece-title">{a.title}</span>}
          </button>
        ))}
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
    </>
  );
}
