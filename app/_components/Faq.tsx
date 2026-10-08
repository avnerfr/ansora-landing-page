"use client";

import { useState } from "react";

export function Faq({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="lp-faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="lp-faq-item">
            <button
              type="button"
              className="lp-faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="lp-faq-title">
                <span className="lp-code">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
                {!isOpen && <path d="M12 5v14" />}
              </svg>
            </button>
            {isOpen && <p className="lp-faq-a">{item.body}</p>}
          </div>
        );
      })}
    </div>
  );
}
