import type { ReactNode } from "react";
import { CONTENT, REGISTER_URL, type Lang } from "../_content/content";
import { Faq } from "./Faq";

const A = "/landing-assets";

const Corners = () => (
  <>
    <i className="corner tl" />
    <i className="corner tr" />
    <i className="corner bl" />
    <i className="corner br" />
  </>
);

const Box = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`blueprint lp-card ${className}`}>
    {children}
    <Corners />
  </div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <>
    <span className="lp-eyebrow">{children}</span>
    <div className="lp-rule" />
  </>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="lp-list">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);

const ListBox = ({ title, rows, prefix }: { title: string; rows: string[]; prefix: string }) => (
  <div className="blueprint lp-listbox">
    <div className="lp-listbox-title">{title}</div>
    {rows.map((s, i) => (
      <div className="lp-listbox-row" key={s}>
        <span className="lp-code">
          {prefix}
          {i + 1}
        </span>
        <span>{s}</span>
      </div>
    ))}
    <Corners />
  </div>
);

const Cta = ({ children, block = false }: { children: ReactNode; block?: boolean }) => (
  <a
    href={REGISTER_URL}
    target="_blank"
    rel="noopener"
    className={`btn btn-primary blueprint lp-cta${block ? " btn-block" : ""}`}
  >
    {children}
    <Corners />
  </a>
);

const Logo = () => (
  <a href="#top" dir="ltr" className="lp-logo">
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" aria-hidden="true">
      <circle cx="12" cy="24" r="6" fill="currentColor" />
      <path d="M24 12a17 17 0 0 1 0 24" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />
      <path d="M34 6a25.5 25.5 0 0 1 0 36" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" opacity="0.4" />
    </svg>
    <span>Ansora</span>
  </a>
);

export function Landing({ lang }: { lang: Lang }) {
  const c = CONTENT[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={lang} className="lp">
      <a href="#main" className="lp-skip">
        {c.nav.skip}
      </a>

      <nav className="nav lp-nav">
        <Logo />
        <div className="lp-nav-links">
          <a href="#meet">{c.nav.meet}</a>
          <a href="#why">{c.nav.why}</a>
          <a href="#price">{c.nav.price}</a>
          <a href={c.nav.otherHref} hrefLang={lang === "he" ? "en" : "he"}>
            {c.nav.other}
          </a>
        </div>
        <a href={REGISTER_URL} target="_blank" rel="noopener" className="btn btn-primary blueprint lp-nav-cta">
          {c.ctaEnter}
          <Corners />
        </a>
      </nav>

      <div id="top" className="lp-wrap" />
      <main id="main">
        <div className="lp-wrap">
          {/* Hero */}
          <section className="lp-hero">
            <div className="lp-hero-title">
              <h1 className="lp-h1">
                <span className="lp-h1-small">{c.hero.small}</span>
                <span className="lp-h1-big">{c.hero.big}</span>
              </h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/hero.jpg`} alt={c.hero.heroAlt} className="lp-hero-img" />
            </div>
            <p className="lp-lead">{c.hero.lead}</p>
            <div className="lp-hero-actions">
              <Cta>{c.ctaEnter}</Cta>
              <a href="#price" className="lp-price-link">
                {c.hero.priceLine}
              </a>
            </div>
          </section>

          {/* What she does */}
          <section className="lp-section">
            <Eyebrow>{c.what.eyebrow}</Eyebrow>
            <h2 className="lp-h2 lp-h2-wide">{c.what.title}</h2>
            <div className="lp-grid lp-grid-4">
              {c.what.cards.map((s, i) => (
                <Box key={s} className="lp-step">
                  <span className="lp-code">0{i + 1}</span>
                  <h3 className="lp-h3 lp-h3-big">{s}</h3>
                </Box>
              ))}
            </div>
            <div className="lp-grid lp-grid-2 lp-after-cards">
              <Box>
                <h3 className="lp-h3">{c.what.stay.title}</h3>
                <List items={c.what.stay.items} />
                <p className="lp-p">{c.what.stay.text}</p>
              </Box>
              <Box>
                <h3 className="lp-h3">{c.what.brings.title}</h3>
                <List items={c.what.brings.items} />
                <p className="lp-p">{c.what.brings.text}</p>
              </Box>
            </div>
          </section>

          {/* Team + price */}
          <section id="price" className="lp-team">
            <div className="lp-team-main">
              <span className="lp-eyebrow lp-eyebrow-flush">{c.team.eyebrow}</span>
              <h2 className="lp-h2">{c.team.title}</h2>
              <figure className="blueprint lp-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/four-figures.jpg`} alt={c.team.imageAlt} />
                <Corners />
              </figure>
              <p className="lp-p">{c.team.text}</p>
            </div>
            <div className="blueprint lp-pricecard">
              <div className="lp-pricecard-head">
                <span className="lp-pricecard-label">{c.team.priceLabel}</span>
                <span className="tag tag-accent">{c.team.tag}</span>
              </div>
              <div className="lp-pricecard-amount">
                <span dir="ltr" className="lp-amount">
                  247
                </span>
                <span className="lp-unit">{c.team.priceUnit}</span>
              </div>
              <Cta block>{c.ctaWork}</Cta>
              <Corners />
            </div>
          </section>

          {/* Meet her */}
          <section id="meet" className="lp-section lp-stack">
            <div>
              <Eyebrow>{c.meet.eyebrow}</Eyebrow>
              <h2 className="lp-h2">{c.meet.title}</h2>
            </div>
            <figure className="blueprint lp-figure">
              <picture>
                <source media="(max-width: 640px)" srcSet={`${A}/mobile-demo.gif`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/demo.gif`} alt={c.meet.demoAlt} />
              </picture>
              <Corners />
            </figure>
            <div>
              <Cta>{c.ctaWork}</Cta>
            </div>
          </section>

          {/* Why */}
          <section id="why" className="lp-section">
            <Eyebrow>{c.why.eyebrow}</Eyebrow>
            <div className="lp-why-head">
              <h2 className="lp-h2">{c.why.title}</h2>
              <p className="lp-p lp-p-big">{c.why.lead}</p>
            </div>
            <div className="lp-grid lp-grid-2">
              <ListBox title={c.why.wantTitle} rows={c.why.wants} prefix="A" />
              <ListBox title={c.why.needTitle} rows={c.why.needs} prefix="B" />
            </div>
            <p className="lp-p lp-p-big lp-closing">{c.why.closing}</p>
          </section>
        </div>

        {/* Intuition band */}
        <section className="lp-band">
          <div className="lp-wrap lp-band-inner">
            <p>{c.intuition}</p>
          </div>
        </section>

        <div className="lp-wrap">
          <section className="lp-section lp-section-first">
            <Eyebrow>{c.science.eyebrow}</Eyebrow>
            <div className="lp-grid lp-grid-2">
              <Box>
                <h3 className="lp-h3">{c.science.title}</h3>
                <p className="lp-p">{c.science.text}</p>
                <List items={c.science.items} />
              </Box>
              <Box>
                <h3 className="lp-h3">{c.science.meaningTitle}</h3>
                <p className="lp-p">{c.science.meaningLead}</p>
                <List items={c.science.meaningItems} />
                <p className="lp-p">{c.science.meaningText}</p>
              </Box>
            </div>
          </section>

          <section className="lp-section">
            <Eyebrow>{c.learns.eyebrow}</Eyebrow>
            <h2 className="lp-h2 lp-h2-gap">{c.learns.title}</h2>
            <div className="lp-grid lp-grid-2">
              <Box>
                <h3 className="lp-h3">{c.learns.cardTitle}</h3>
                <p className="lp-p">{c.learns.text}</p>
                <p className="lp-p lp-strong">{c.learns.needsLead}</p>
                <List items={c.learns.needs} />
              </Box>
              <Box>
                <h3 className="lp-h3">{c.learns.afterTitle}</h3>
                <List items={c.learns.afterItems} />
                <p className="lp-p">{c.learns.afterText}</p>
                <div>
                  <Cta>{c.ctaEnter}</Cta>
                </div>
              </Box>
            </div>
          </section>

          <section className="lp-section">
            <Eyebrow>{c.journey.eyebrow}</Eyebrow>
            <div className="lp-grid lp-grid-2">
              <Box>
                <h3 className="lp-h3">{c.journey.title}</h3>
                <p className="lp-p">{c.journey.text}</p>
              </Box>
              <Box>
                <h3 className="lp-h3">{c.journey.guideTitle}</h3>
                <p className="lp-p">{c.journey.guideLead}</p>
                <List items={c.journey.guideItems} />
              </Box>
            </div>
          </section>

          <section className="lp-section lp-stack">
            <div>
              <Eyebrow>{c.daily.eyebrow}</Eyebrow>
              <h2 className="lp-h2">{c.daily.title}</h2>
            </div>
            <figure className="blueprint lp-figure">
              <picture>
                <source media="(max-width: 640px)" srcSet={`${A}/mobile-screen.png`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/workshop.png`} alt={c.daily.imageAlt} />
              </picture>
              <Corners />
            </figure>
            <div className="lp-grid lp-grid-2">
              <Box>
                <p className="lp-p lp-p-big">{c.daily.intro}</p>
              </Box>
              <Box>
                <p className="lp-p lp-p-big lp-strong">{c.daily.stepsLead}</p>
                <List items={c.daily.steps} />
              </Box>
            </div>
            <p className="lp-p lp-p-big lp-outro">{c.daily.outro}</p>
            <div>
              <Cta>{c.ctaWork}</Cta>
            </div>
          </section>

          {c.more.length > 0 && (
            <section id="more" className="lp-section lp-more">
              <div>
                <span className="lp-eyebrow lp-eyebrow-flush">{c.moreEyebrow}</span>
                <h2 className="lp-h2">{c.moreTitle}</h2>
              </div>
              <Faq items={c.more} />
            </section>
          )}

          <section className="lp-section">
            <div className="blueprint lp-final">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/icon.png`} alt="" className="lp-final-icon" />
              <h2 className="lp-h2 lp-final-title">{c.final.title}</h2>
              <Cta>{c.ctaEnter}</Cta>
              <span className="lp-final-price">{c.final.priceLine}</span>
              <Corners />
            </div>
          </section>
        </div>
      </main>

      <div className="lp-wrap">
        <footer className="lp-footer">
          <span dir="ltr" className="lp-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/icon.png`} alt="" />
            <span>Ansora</span>
          </span>
          <span>{c.footer}</span>
        </footer>
      </div>
    </div>
  );
}
