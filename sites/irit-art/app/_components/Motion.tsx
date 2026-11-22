"use client";
import { useEffect } from "react";

/** Scroll parallax (--sy) and reveal-on-scroll for .reveal-on-scroll. */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.style.setProperty("--sy", String(window.scrollY));
      });
    };
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
